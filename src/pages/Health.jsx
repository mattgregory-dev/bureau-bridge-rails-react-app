import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../auth";

export default function Health() {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    api("/api/health")
      .then((d) => setOk(d.ok))
      .catch(() => setOk(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6 space-y-4">
        <h1 className="text-2xl font-bold">Health</h1>

        <p className="text-sm text-gray-700">
          API healthy:{" "}
          {ok === null ? (
            <span className="text-gray-400">loading…</span>
          ) : ok ? (
            <span className="text-green-600 font-medium">true</span>
          ) : (
            <span className="text-red-600 font-medium">false</span>
          )}
        </p>

        <Link
          to="/dashboard"
          className="inline-block px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
