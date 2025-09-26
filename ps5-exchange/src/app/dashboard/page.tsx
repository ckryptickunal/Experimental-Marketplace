export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="text-sm text-gray-600">Your listings</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="text-sm text-gray-600">Purchases</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
        </div>
      </div>
    </div>
  );
}

