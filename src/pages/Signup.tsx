import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../auth";
import { Button } from "../components/ui/Button";
import logo from "../assets/logo.webp";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

type SignupResponse = { ok: boolean };

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api<SignupResponse>("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      // When you add email verification, re-connect this
      // IMPORTANT: do NOT call /api/me here. User is not logged in until verified.
      // nav(`/check-email?email=${encodeURIComponent(email)}`);
      nav("/snapshot")
    } catch (err: any) {
      setError(err?.message || "Signup failed");
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
              <div className="flex flex-col items-center gap-2">
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
                <div className="text-base text-slate-700 font-semibold mt-2">
                  Sign up to get started
                </div>
              </div>
            }
          />

          <CardBody>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  autoComplete="new-password"
                  required
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating account…" : "Sign up"}
              </Button>

              <div className="pt-4 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Log in
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
