export default function Dashboard({ me, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6 space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            Logged in as:{" "}
            <span className="font-medium">{me.email}</span>
          </p>
          <p>
            Role: <span className="font-medium">{me.role}</span>
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-sm rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>

          <a
            href="/health"
            className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
          >
            API Health page
          </a>
        </div>
      </div>
    </div>
  );
}
