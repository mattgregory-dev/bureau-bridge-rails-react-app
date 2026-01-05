import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../auth";
import { Button } from "../components/ui/Button";
import logo from "../assets/logo.webp";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

type Me = {
  id: string;
  email: string;
  role?: string;
  tenantId?: string | null;
};

type LoginProps = {
  onLoggedIn: (me: Me) => void;
};

type LoginResponse = unknown;

export default function Login({ onLoggedIn }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      nav("/snapshot");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader
            className="items-center text-center"
            title={
              <div className="items-center text-center">
                <Link to="/snapshot" className="block">
                  <img
                    src={logo}
                    alt="BureauBridge"
                    className="mx-auto w-[187px] h-auto"
                  />
                </Link>
                <div className="text-sm text-slate-600 italic">
                  Credit readiness for life goals
                </div>
                <div className="text-base text-slate-600 font-semibold mt-8">
                  Sign in to continue
                </div>
              </div>
            }
          />
          <CardBody>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing in…" : "Login"}
              </Button>

              <div className="pt-8 pb-3 text-sm text-center text-gray-600 space-y-1">
                {/* Add back after adding email verification */}
                {/* <div className="mb-4">
                  <Link to="/forgot-password" className="underline">
                    Forgot your password?
                  </Link>
                </div> */}
                <div>
                  Don’t have an account?{" "}
                  <Link to="/signup" className="underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
