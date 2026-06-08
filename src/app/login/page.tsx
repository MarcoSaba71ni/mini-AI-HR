"use client";

import { useState } from "react";
import { supabase } from "@/services/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-blue-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">
            HR Login
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Sign in to your account
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white font-medium py-2 rounded-md transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-900 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}