"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EmployeeType from "../../types/employees";
import EmployeeCard from "../components/EmployeeCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Employees() {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [ loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

                setEmployees(data as EmployeeType[]);
            } catch (error) {
                setError("Error fetching employees");
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        }

        async function checkAuth() {
            const {data : {user} } = await supabase.auth.getUser();
            if (!user) {
                router.push("/");
                return
            }

        getEmployees();
        };

        checkAuth();
    }, []);


  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">
            Employees Page
        </h1>
        <p>This is the employees page.</p>
        <Link
            className="border px-4 py-2 rounded"
            href="/create-employee"
        >
            Create Employee
        </Link>
        { loading && (
         <p>Loading employees...</p>
        ) }
        { error && (
         <p>{error}</p>
        ) }
        <div className="flex flex-wrap gap-4">
            {employees.map((employee: EmployeeType) => (
                <EmployeeCard key={employee.id} employee={employee} />
            ))}            
        </div>
        {employees.length === 0 && <p>No employees found.</p>}
    

    </main>
  );
}

export default Employees;