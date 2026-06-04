"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email!");
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        HR Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={signIn}
        className="bg-black text-white px-4 py-2 cursor-pointer rounded-md"
      >
        Login
      </button>
    </main>
  );
}