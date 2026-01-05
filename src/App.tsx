import { useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { api } from "./auth";
import Health from "./pages/Health";
import Login from "./pages/Login";
//import ForgotPassword from "./pages/ForgotPassword";
//import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
//import CheckEmail from "./pages/CheckEmail";
//import VerifyEmail from "./pages/VerifyEmail";
import Snapshot from "./pages/Snapshot";
import Readiness from "./pages/Readiness";
import History from "./pages/History";
import Settings from "./pages/Settings";
import DebugPanel from "./debug/DebugPanel";
import SnapshotMock from "./mock/SnapshotMock";
import HistoryMock from "./mock/HistoryMock";
import ReadinessMock from "./mock/ReadinessMock";

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

        {/* When we reconnect this, make sure to add password reset and any other pages you added
        
        <Route
          path="/forgot-password"
          element={me ? <Navigate to="/snapshot" replace /> : <ForgotPassword />}
        /> */}

        <Route
          path="/signup"
          element={me ? <Navigate to="/snapshot" replace /> : <Signup />}
        />

        {/* <Route
          path="/reset-password"
          element={me ? <Navigate to="/snapshot" replace /> : <ResetPassword />}
        />

        <Route
          path="/check-email"
          element={me ? <Navigate to="/snapshot" replace /> : <CheckEmail />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        /> */}

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
          path="/mock/snapshot" element={
              <ProtectedRoute me={me} checking={checking}>
                <SnapshotMock />
              </ProtectedRoute>
          }
        />

        <Route
          path="/mock/history" element={
              <ProtectedRoute me={me} checking={checking}>
                <HistoryMock />
              </ProtectedRoute>
          }
        />

        <Route
          path="/mock/readiness" element={
              <ProtectedRoute me={me} checking={checking}>
                <ReadinessMock />
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
              <DebugPanel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />

      </Routes>
    </BrowserRouter>
  );
}
