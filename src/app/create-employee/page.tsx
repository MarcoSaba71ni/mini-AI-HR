"use client";
import { useState } from "react";
import { supabase } from "@/services/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";



function CreateEmployee() {


    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const { data, error } = await supabase.from("employees").insert({
            full_name: fullName,
            email,
            role,
            is_active: true,
        });

        console.log("Insert response:", { data, error });
        if (error) {
            console.error(error);
            setError("Unable to create employee. Please try again.");
            return;
        }
        
        router.push("/employees");
        console.log("Employee created:", data);
    };
    



    return (
        <main className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-2">Create Employee</h1>
            <p className="mb-6">Register a new employee in your directory.</p>

            <div className="flex flex-col gap-4 items-center mb-8 bg-[var(--text-primary)] text-white p-4 rounded-lg">
                <span>Alternatively, use our AI Assistant to register or manage an employees.</span>
                <Link
                    className="flex justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded transition-colors"
                    href="/ai-assistant"
                >
                    AI Assistant
                </Link>
            </div>

            {error && (
                <div className="mb-6 border border-red-200 bg-red-50 rounded-lg px-4 py-3 w-full max-w-2xl">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="border border-blue-900 bg-white rounded-lg p-6 flex flex-col gap-4 w-full max-w-2xl"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="full_name" className="font-medium">Full Name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border border-blue-200 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                        type="text"
                        id="full_name"
                        name="full_name"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-blue-200 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="role" className="font-medium">Role</label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-blue-200 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                        type="text"
                        id="role"
                        name="role"
                        required
                    />
                </div>

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 cursor-pointer rounded transition-colors"
                    >
                        Create Employee
                    </button>
                </div>
            </form>
        </main>
    )
}

export default CreateEmployee;