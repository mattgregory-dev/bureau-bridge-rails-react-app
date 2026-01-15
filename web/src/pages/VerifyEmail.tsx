import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { api } from "../auth";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function VerifyEmail() {
  const q = useQuery();
  const email = q.get("email") || "";
  const token = q.get("token") || "";
  const nav = useNavigate();

  const [status, setStatus] = useState<"working" | "ok" | "error">("working");
  const [message, setMessage] = useState<string>("Verifying…");

  useEffect(() => {
    if (!email || !token) {
      setStatus("error");
      setMessage("Missing token or email");
      return;
    }

    api<{ ok: boolean; error?: string }>("/api/email_verifications/confirm", {
      method: "POST",
      body: JSON.stringify({ email, token }),
    })
      .then(() => {
        setStatus("ok");
        setMessage("Email verified. You can log in now.");
        setTimeout(() => nav("/login"), 700);
      })
      .catch(async (err: any) => {
        setStatus("error");
        setMessage(err?.message || "Invalid or expired link");
      });
  }, [email, token, nav]);

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader
            className="items-center text-center"
            title="Email verification"
            subtitle={status === "working" ? "Please wait" : undefined}
          />
          <CardBody className="text-sm">
            <div className={status === "error" ? "text-red-600" : "text-slate-700"}>
              {message}
            </div>
            <div className="mt-4 text-center">
              <Link className="underline" to="/login">Go to login</Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
