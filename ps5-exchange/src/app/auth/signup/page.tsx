"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-sm">
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setMessage(null);
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
          if (res.ok) setMessage("Account created! You can now sign in.");
          else setMessage("Failed to create account");
        }}
      >
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        {message && <div className="text-sm text-gray-700">{message}</div>}
        <button type="submit" className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Sign up</button>
      </form>
      <div className="mt-2 text-sm">
        Already have an account? <Link href="/auth/login" className="text-brand-700 hover:underline">Sign in</Link>
      </div>
    </div>
  );
}

