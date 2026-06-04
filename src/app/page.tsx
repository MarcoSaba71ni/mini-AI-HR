"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";



export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
      }
    }
    getUser();
  }, []);


  async function signOut() {
    await supabase.auth.signOut();
    setEmail(null);
    window.location.href = "/login";
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Mini AI HR
      </h1>
      {email ? (
        <>
          <p>Logged in as: {email}</p>
          <button
            className="border bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md"
            onClick={signOut}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <Link
            href="/login"
            className="border px-4 py-2 rounded"
          >
            Login
          </Link>
        </>
      )}
    </main>
  );

}
