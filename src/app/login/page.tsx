"use client";

import { useState } from "react";
import { supabase } from "@/services/supabase";

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
    <main className="flex flex-col items-center pt-12 gap-4">
      <h1 className="text-2xl font-bold mb-4">
        HR Login
      </h1>
      <div className="flex flex-col mb-4">
        <label className="text-[var(--text-primary)] text-lg p-2 rounded-md">
          Insert your email to receive a login link:
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64 border p-2 mr-2 bg-gray-100 rounded-md"
        />        
      </div>


      <button
        onClick={signIn}
        className="bg-[var(--text-primary)] text-white px-4 py-2 cursor-pointer rounded-md"
      >
        Login
      </button>
    </main>
  );
}