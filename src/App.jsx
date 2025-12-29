import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { api } from "./auth";

function LoginPage({ onLoggedIn }) {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      await api("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
      const me = await api("/api/me");
      onLoggedIn(me);
      nav("/dashboard");
    } catch {
      setError("Login failed");
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Login</h1>
      <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="submit">Login</button>
        {error && <div style={{ color: "tomato" }}>{error}</div>}
      </form>
    </div>
  );
}

function Dashboard({ me, onLogout }) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Dashboard</h1>
      <p>Logged in as: {me.email}</p>
      <p>Role: {me.role}</p>
      <button onClick={onLogout}>Logout</button>
      <p style={{ marginTop: 16 }}>
        <Link to="/health">API Health page</Link>
      </p>
    </div>
  );
}

function HealthPage() {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    api("/api/health")
      .then((d) => setOk(d.ok))
      .catch(() => setOk(false));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Health</h1>
      <p>API healthy: {ok === null ? "loading..." : String(ok)}</p>
      <p><Link to="/dashboard">Back</Link></p>
    </div>
  );
}

function ProtectedRoute({ me, checking, children }) {
  if (checking) return <div style={{ padding: 24 }}>Checking session...</div>;
  if (!me) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [me, setMe] = useState(null);
  const [checking, setChecking] = useState(true);

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
        <Route path="/login" element={<LoginPage onLoggedIn={setMe} />} />
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
              <HealthPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
