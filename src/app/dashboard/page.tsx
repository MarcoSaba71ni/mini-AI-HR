"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import Link from "next/link";
import type { EmployeeTypeWithStatus } from "../../types/employees";

export default function Dashboard() {
    const [employees, setEmployees] = useState<EmployeeTypeWithStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        async function fetchEmployees() {
            setLoading(true);
            const { data, error } = await supabase.from("employees").select("*");
            if (!error && data) {
                setEmployees(data as EmployeeTypeWithStatus[]);
            }
            setLoading(false);
        }

        if (authLoading) return;
        if (!user) {
            router.push("/");
            return;
        }
        fetchEmployees();
    }, [authLoading, user, router]);

    const total = employees.length;
    const active = employees.filter(e => e.is_active === true).length;
    const inactive = employees.filter(e => e.is_active === false).length;
    const recent = employees.slice(0, 5);

    return (
        <main className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="border bg-[var(--text-primary)] text-white border-blue-900 rounded-lg p-6 flex flex-col items-center">
                    <p className="text-sm text-white font-medium mb-2">Total Employees</p>
                    <p className="text-4xl font-bold">{loading ? "..." : total}</p>
                </div>
                <div className="border bg-[var(--text-primary)] text-white border-blue-900 rounded-lg p-6 flex flex-col items-center">
                    <p className="text-sm text-white font-medium mb-2">Active Employees</p>
                    <p className="text-4xl font-bold">{loading ? "..." : active}</p>
                </div>
                <div className="border bg-[var(--text-primary)] text-white border-blue-900 rounded-lg p-6 flex flex-col items-center">
                    <p className="text-sm text-white font-medium mb-2">Inactive Employees</p>
                    <p className="text-4xl font-bold">{loading ? "..." : inactive}</p>
                </div>
            </div>

            {/* Recent Employees */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Recent Employees</h2>
                <div className="border border-blue-900 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="text-left px-6 py-3">Name</th>
                                <th className="text-left px-6 py-3">Role</th>
                                <th className="text-left px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : recent.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-center">No employees found.</td>
                                </tr>
                            ) : (
                                recent.map((employee, idx) => (
                                    <tr key={employee.id} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                                        <td className="px-6 py-4">{employee.full_name}</td>
                                        <td className="px-6 py-4">{employee.role}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                employee.is_active === true
                                                    ? "bg-green-100 text-green-800"
                                                    : employee.is_active === false
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}>
                                                {employee.is_active === true ? "Active" : employee.is_active === false ? "Inactive" : "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <Link
                        href="/employees"
                        className="bg-[var(--text-primary)] border-blue-700 text-white hover:bg-blue-900 hover:text-white px-6 py-2 rounded transition-colors"
                    >
                        View All Employees
                    </Link>
                </div>
            </section>

            {/* Quick Actions */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link
                        href="/create-employee"
                        className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Create Employee
                    </Link>
                    <Link
                        href="/ai-assistant"
                        className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Open AI Assistant
                    </Link>
                </div>
            </section>
        </main>
    );
}
