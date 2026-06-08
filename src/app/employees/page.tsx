"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import type { EmployeeTypeWithStatus } from "../../types/employees";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import EmployeeCard from "@/app/components/EmployeeCard";

function Employees() {
    const [employees, setEmployees] = useState<EmployeeTypeWithStatus[]>([]);
    const [ loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {

        async function getEmployees() {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase.from("employees").select("*");
                console.log("Fetched employees data:", data);

                if (error) {
                    console.error("Error fetching employees:", error);
                    throw error;
                }

                setEmployees(data as EmployeeTypeWithStatus[]);
            } catch (error) {
                setError("Error fetching employees");
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        }

        if (authLoading) {
            return;
        }

        if (!user) {
                router.push("/");
                return;
        }

        getEmployees();
    }, [authLoading, user, router]);

    const filteredEmployees = employees.filter((employee) =>  {
        const searchLower = searchTerm.toLowerCase();
        return (
            employee.full_name.toLowerCase().includes(searchLower) ||
            employee.email.toLowerCase().includes(searchLower) ||
            employee.role.toLowerCase().includes(searchLower)
        );
    }) // Add search/filter logic here if needed



  return (
    <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-2">Employees</h1>
        <p className="mb-6">Manage, view and add employees.</p>

        <div className="flex gap-4 mb-8">
            <Link
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded transition-colors"
                href="/create-employee"
            >
                Create Employee
            </Link>
            <Link
                className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 rounded transition-colors"
                href="/ai-assistant"
            >
                AI Assistant
            </Link>
        </div>

        { loading && (
            <p>Loading employees...</p>
        ) }
        { error && (
            <p>{error}</p>
        ) }

        {!loading && !error && (
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
                <input
                    type="text"
                    placeholder="Search for name, email, or role..."
                    className="bg-gray-100 p-2 rounded mb-4 w-full max-w-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="border border-blue-900 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="text-left px-6 py-3">Name</th>
                                <th className="text-left px-6 py-3">Email</th>
                                <th className="text-left px-6 py-3">Role</th>
                                <th className="text-left px-6 py-3">Status</th>
                                <th className="text-right px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">No employees found.</td>
                                </tr>
                            ) : (
                                filteredEmployees.map((employee, idx) => (
                                    <EmployeeCard
                                        key={employee.id}
                                        employee={employee}
                                        rowClassName={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        )}
    

    </main>
  );
}

export default Employees;