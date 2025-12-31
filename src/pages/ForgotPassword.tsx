import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // wire to Rails later: POST /api/password/forgot (example)
    alert("If this email exists, a reset link will be sent.");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader title="Forgot password" subtitle="Send a reset link to your email." />
          <CardBody>
            <form onSubmit={submit} className="space-y-3">
              <label className="block">
                <div className="text-xs font-medium text-slate-600">Email</div>
                <input
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </label>
              <Button type="submit" className="w-full">Send reset link</Button>
              <div className="text-center text-sm">
                <Link className="text-slate-700 underline" to="/login">
                  Back to login
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
