"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";



function CreateEmployee() {


    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { data, error } = await supabase.from("employees").insert({
            full_name: fullName,
            email,
            role,
            is_active: true,
        });
        console.log("Insert response:", { data, error });
        if (error) {
        console.error(error);
        return;
        }
        
        router.push("/employees");
        console.log("Employee created:", data);
    };
    



    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">
                Create Employee Page
            </h1>
            <p>Register a new employee.</p>
            <form
            onSubmit={handleSubmit} className="border bg-gray-100 rounded-lg p-4 flex flex-col gap-4 w-full max-w-md">
                <div className="flex flex-col gap-1">
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border p-2 rounded-md bg-white"
                        type="text"
                        id="full_name"
                        name="full_name"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-md bg-white"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="role">Role:</label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border p-2 rounded-md bg-white"
                        type="text"
                        id="role"
                        name="role"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 cursor-pointer rounded-md mt-4"
                >
                    Create Employee
                </button>
            </form>
        </main>
    )
}

export default CreateEmployee;