"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import Link from "next/link";

type EmployeeForm = {
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
};

function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();
  const employeeId = Array.isArray(id) ? id[0] : id;
  const [employee, setEmployee] = useState<EmployeeForm>({
    full_name: "",
    email: "",
    role: "",
    is_active: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.from("employees")
      .update({
        full_name: employee.full_name,
        email: employee.email,
        role: employee.role,
      })
      .eq("id", employeeId);

    if (error) {
      console.error("Error updating employee:", error);
      setError("Unable to save employee changes. Please try again.");
    } else {
      router.push("/employees");
    }
  }

  async function handleToggleActive() {
    setError(null);
    const nextIsActive = !employee.is_active;
    const { error } = await supabase.from("employees")
      .update({ is_active: nextIsActive })
      .eq("id", employeeId);

    if (error) {
      console.error("Error updating employee status:", error);
      setError("Unable to update employee status. Please try again.");
    } else {
      setEmployee((prev) => ({ ...prev, is_active: nextIsActive }));
      router.push("/employees");
    }
  }

  function renderActivationButton() {
    const isActive = employee.is_active;

    return (
      <button
        type="button"
        onClick={handleToggleActive}
        className={isActive
          ? "bg-red-600 hover:bg-red-700 cursor-pointer text-white py-2 px-4 rounded transition-colors"
          : "bg-green-600 hover:bg-green-700 cursor-pointer text-white py-2 px-4 rounded transition-colors"
        }
      >
        {isActive ? "Deactivate Employee" : "Activate Employee"}
      </button>
    );
  }

  useEffect(() => {
    if (!employeeId) {
      return;
    }

    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", employeeId)
        .single();

      if (error || !data) {
        console.error("Error fetching employee:", error);
        setError("Unable to fetch employee details.");
      } else {
        setEmployee({
          full_name: data.full_name,
          email: data.email,
          role: data.role,
          is_active: data.is_active
        });
      }

      setLoading(false);
    };

    fetchEmployee();
  }, [employeeId]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-2">Edit Employee</h1>
      <p className="mb-6">Update employee details and activation status.</p>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-4 mx-48 items-center mb-8 bg-[var(--text-primary)] text-white p-4 rounded-lg">
            <span>Alternatively, use our AI Assistant to register or manage an employees.</span>
            <Link
                className="flex justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded transition-colors"
                href="/ai-assistant"
            >
                AI Assistant
            </Link>
        </div>
        <div>
          <Link
            className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 rounded transition-colors"
            href="/employees"
          >
            Back to Employees
          </Link>
          <Link
            className="border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 rounded transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>          
        </div>

      </div>

      {loading && <p>Loading employee...</p>}

      {error && (
        <div className="mb-6 border border-red-200 bg-red-50 rounded-lg px-4 py-3 w-full max-w-2xl">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!loading && (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-blue-900 bg-white p-6 rounded-lg gap-4 w-full max-w-2xl">
        <label className="flex flex-col gap-1">
          <span className="font-medium">Full Name</span>
          <input
            type="text"
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={employee.full_name}
            onChange={(e) => setEmployee({ ...employee, full_name: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium">Email</span>
          <input
            type="email"
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium">Role</span>
          <input
            type="text"
            className="border border-blue-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-800"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
            required
          />
        </label>

        <div className="pt-2">
          {renderActivationButton()}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-900 hover:bg-blue-800 cursor-pointer text-white py-2 px-6 rounded transition-colors">
            Save Changes
          </button>
        </div>
      </form>
      )}
    </main>
  );
}

export default EditEmployeePage;