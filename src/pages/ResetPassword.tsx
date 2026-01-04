import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { api } from "../auth";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import logo from "../assets/logo.webp";

type ResetResponse = unknown;

export default function ResetPassword() {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      setError("Invalid or expired reset link.");
    }
  }, [email, token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api<ResetResponse>("/api/password_resets/confirm", {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      setDone(true);

      // give user a moment, then go to dashboard
      setTimeout(() => {
        nav("/dashboard");
      }, 800);
    } catch (err: any) {
      setError(err?.message || "Reset failed");
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
                  Choose a new password for your account.
                </div>
              </div>
            }
          />
          <CardBody>
            {done ? (
              <div className="text-sm text-slate-700 space-y-3">
                <p>Your password has been reset.</p>
                <p>Redirecting you to your dashboard…</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div>
                  <label className="block">
                    <div className="text-xs font-medium text-slate-600">
                      New password
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                      autoComplete="new-password"
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="block">
                    <div className="text-xs font-medium text-slate-600">
                      Confirm password
                    </div>
                    <input
                      type="password"
                      value={passwordConfirmation}
                      onChange={(e) =>
                        setPasswordConfirmation(e.target.value)
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                      autoComplete="new-password"
                      required
                    />
                  </label>
                </div>

                {error && (
                  <div className="text-sm text-red-600 text-center">{error}</div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !email || !token}
                >
                  {loading ? "Resetting…" : "Reset password"}
                </Button>

                <div className="pt-8 pb-3 pb-3 text-sm text-center text-gray-600">
                  <Link to="/login" className="text-slate-700 underline">
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
