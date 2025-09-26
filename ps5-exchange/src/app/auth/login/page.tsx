"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-sm">
      <h2 className="text-2xl font-semibold">Welcome back</h2>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
          if ((res as any)?.error) setError("Invalid credentials");
        }}
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button type="submit" className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Sign in</button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        <Link href="/auth/forgot" className="hover:underline">Forgot password?</Link>
      </div>
      <div className="mt-2 text-sm">
        New here? <Link href="/auth/signup" className="text-brand-700 hover:underline">Create an account</Link>
      </div>
    </div>
  );
}

