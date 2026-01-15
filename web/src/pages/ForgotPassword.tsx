import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../auth";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import logo from "../assets/logo.webp";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api("/api/password_resets", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err: any) {
      // still do not reveal whether email exists
      setSent(true);
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
                  Send a reset link to your email.
                </div>
              </div>
            }
          />
          <CardBody>
            {sent ? (
              <div className="space-y-4 text-sm text-slate-700">
                <p>
                  If an account exists for that email, a password reset link has
                  been sent.
                </p>
                <div className="text-center">
                  <Link className="text-slate-700 underline" to="/login">
                    Back to login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <label className="block">
                  <div className="text-xs font-medium text-slate-600">Email</div>
                  <input
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>

                {error && (
                  <div className="text-sm text-red-600">{error}</div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Send reset link"}
                </Button>

                <div className="pt-8 pb-3 pb-3 text-sm text-center text-gray-600">
                  <Link className="text-slate-700 underline" to="/login">
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
