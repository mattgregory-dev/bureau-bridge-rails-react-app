import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { api } from "./auth";
import { loadFixture } from "./fixtures/loadFixture";
import { runPipeline } from "./pipeline/runPipeline";
import DebugPanel from "./debug/DebugPanel";
import Dashboard from "./pages/Dashboard";
import Health from "./pages/Health";
import Login from "./pages/Login";

function ProtectedRoute({ me, checking, children }) {
  if (checking) return <div style={{ padding: 24 }}>Checking session...</div>;
  if (!me) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [me, setMe] = useState(null);
  const [checking, setChecking] = useState(true);
  const debugEnabled =
    import.meta.env.DEV &&
    new URLSearchParams(location.search).has("debug");
  const [trace, setTrace] = useState(null);

  useEffect(() => {
    if (!debugEnabled) return;

    (async () => {
      try {
        console.log("Debug: loading fixture...");
        const raw = await loadFixture("report-airplane-jefferson-2025-03.json");
        console.log("Debug: fixture loaded", raw);

        console.log("Debug: running pipeline...");
        const out = runPipeline(raw, { debug: true });
        console.log("Debug: pipeline output", out);

        setTrace(out.trace ?? []);
      } catch (e) {
        console.error("Debug pipeline failed:", e);
        setTrace([{ label: "error", data: String(e) }]);
      }
    })();
  }, [debugEnabled]);

  useEffect(() => {
    api("/api/me")
      .then(setMe)
      .catch(() => setMe(null))
      .finally(() => setChecking(false));
  }, []);

  async function logout() {
    await api("/api/logout", { method: "POST" });
    setMe(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login onLoggedIn={setMe} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute me={me} checking={checking}>
              <Dashboard me={me} onLogout={logout} />
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
                <Navigate to="/dashboard" replace />
              ) : !trace ? (
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
