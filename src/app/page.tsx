"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Home() {
  const { user, email, loading } = useAuth();

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 gap-4">
      <div className="flex flex-col items-center">
        <Image src="/images/meddle-logo.png" alt="Logo" width={256} height={180} className="object-cover" priority />
        <h1 className="text-blue-900 text-2xl font-semibold text-center mb-4">
          Your AI-Powered Employee Management Solution
        </h1>
      </div>
      {loading ? (
        <p>Checking session...</p>
      ) : user ? (
        <div>
          <p>Logged in as: {email}</p>
          <div className="flex flex-col items-center mt-4">
            <Link href="/dashboard" className="bg-[var(--text-primary)] hover:bg-blue-800 text-white cursor-pointer px-4 py-2 rounded">
              Go to Dashboard
            </Link>
          </div>

        </div>


      ) : (
        <>
          <p>Log in to manage and view employees.</p>
          <Link
            href="/login"
            className="bg-blue-900 hover:bg-blue-800 text-white cursor-pointer px-4 py-2 rounded"
          >
            Login
          </Link>
        </>
      )}
    </main>
  );
}
