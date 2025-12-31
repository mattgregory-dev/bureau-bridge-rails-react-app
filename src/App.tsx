import { useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { api } from "./auth";
import { loadFixture } from "./fixtures/loadFixture";
import { runPipeline } from "./pipeline/runPipeline";
import DebugPanel from "./debug/DebugPanel";
import Health from "./pages/Health";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Snapshot from "./pages/Snapshot";
import Readiness from "./pages/Readiness";
import History from "./pages/History";
import Settings from "./pages/Settings";

import type { PipelineTrace, TraceStep } from "./pipeline/debug/tap";


type Me = {
  id: string;
  email: string;
  role?: string;
  tenantId?: string | null;
};

type ProtectedRouteProps = {
  me: Me | null;
  checking: boolean;
  children: ReactNode;
};

function ProtectedRoute({ me, checking, children }: ProtectedRouteProps) {
  if (checking) return <div style={{ padding: 24 }}>Checking session...</div>;
  if (!me) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const [me, setMe] = useState<Me | null>(null);
  const [checking, setChecking] = useState(true);

  const debugEnabled =
    import.meta.env.DEV && new URLSearchParams(location.search).has("debug");

  //const [trace, setTrace] = useState<PipelineTrace | null>(null);
  const [trace, setTrace] = useState<PipelineTrace>([]);

  useEffect(() => {
    if (!debugEnabled) return;

    (async () => {
      try {
        const raw = await loadFixture("report-airplane-jefferson-2025-03.json");
        const out = runPipeline(raw, { debug: true });

        // out.trace is PipelineTrace | null
        setTrace(out.trace ?? []);
      } catch (e) {
        const errorStep: TraceStep = { label: "error", data: String(e) };
        setTrace([errorStep]);
      }
    })();
  }, [debugEnabled]);

  useEffect(() => {
    api<Me>("/api/me")
      .then(setMe)
      .catch(() => setMe(null))
      .finally(() => setChecking(false));
  }, []);

  async function logout() {
    await api<unknown>("/api/logout", { method: "POST" });
    setMe(null);
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to={me ? "/snapshot" : "/login"} replace />}
        />

        <Route
          path="/login"
          element={me ? <Navigate to="/snapshot" replace /> : <Login onLoggedIn={setMe} />}
        />

        <Route
          path="/forgot-password"
          element={me ? <Navigate to="/snapshot" replace /> : <ForgotPassword />}
        />

        <Route
          path="/snapshot"
          element={
            <ProtectedRoute me={me} checking={checking}>
              <Snapshot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/readiness"
          element={
            <ProtectedRoute me={me} checking={checking}>
              <Readiness />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute me={me} checking={checking}>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings" element={
              <ProtectedRoute me={me} checking={checking}>
                <Settings />
              </ProtectedRoute>
          }
        />

        <Route
          path="/health"
          element={
            <ProtectedRoute me={me} checking={checking}>
              <Health />
            </ProtectedRoute>
          }
        />
        <Route
          path="/debug"
          element={
            <ProtectedRoute me={me} checking={checking}>
              {!debugEnabled ? (
                <Navigate to="/snapshot" replace />
              ) : trace === null ? (
                <div className="p-6">Loading debug data…</div>
              ) : (
                <DebugPanel trace={trace} />
              )}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
