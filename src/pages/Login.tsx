import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../auth";
import { Button } from "../components/ui/Button";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

type Me = {
  id: string;
  email: string;
  role?: string;
  tenantId?: string | null;
};

type LoginProps = {
  onLoggedIn: (me: Me) => void;
};

type LoginResponse = unknown; // you do not use the response body from /api/login

export default function Login({ onLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api<LoginResponse>("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const me = await api<Me>("/api/me");
      onLoggedIn(me);
      nav("/dashboard");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow rounded p-6">



      <div className="px-4 py-4 border-b mb-3">
        <div className="flex flex-col items-center gap-0">
          <Link to="/snapshot" className="block">
            <img
              src={logo}
              alt="BureauBridge"
              className="w-[187px] h-auto"
            />
          </Link>
          <div>
            <div className="text-base text-slate-600 italic font-semibold">
              Credit rediness for life goals
            </div>
          </div>
        </div>
      </div>



        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-600 mt-1">Sign in to continue</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
