import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { api } from "../auth";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CheckEmail() {
  const q = useQuery();
  const email = q.get("email") || "";
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function resend() {
    setLoading(true);
    try {
      await api("/api/email_verifications", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
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
            title="Verify your email"
            subtitle={email ? `We sent a link to ${email}` : "We sent you a verification link"}
          />
          <CardBody className="space-y-4 text-sm text-slate-700">
            <div>
              Click the link in the email to verify your account. Then come back and log in.
            </div>

            <Button onClick={resend} disabled={loading || !email} className="w-full">
              {loading ? "Sending…" : sent ? "Sent again" : "Resend email"}
            </Button>

            <div className="text-center">
              <Link className="underline" to="/login">Back to login</Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
