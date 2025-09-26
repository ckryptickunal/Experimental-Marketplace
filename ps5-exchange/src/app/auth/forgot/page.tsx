"use client";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h2 className="text-2xl font-semibold">Reset your password</h2>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <button type="button" className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Send reset link</button>
      </form>
    </div>
  );
}

