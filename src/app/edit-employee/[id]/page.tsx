"use client";
import {useState , useEffect} from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from "@/lib/supabase";

type EmployeeForm = {
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
};

function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeForm>({
    full_name: '',
    email: '',
    role: '',
    is_active: true
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('employees')
      .update({
        full_name: employee.full_name,
        email: employee.email,
        role: employee.role,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating employee:', error);
    } else {
      router.push('/employees'); // Redirect to the employees list page after successful update
    }
  }

  async function handleToggleActive() {
    const nextIsActive = !employee.is_active;
    const { error } = await supabase.from('employees')
      .update({ is_active: nextIsActive })
      .eq('id', id);
      router.push('/employees'); // Redirect to the employees list page after successful update

    if (error) {
      console.error('Error updating employee status:', error);
    } else {
      setEmployee((prev) => ({ ...prev, is_active: nextIsActive }));
    }
  }

  function renderActivationButton() {
    const isActive = employee.is_active;

    return (
      <button
        type="button"
        onClick={handleToggleActive}
        className={isActive
          ? "bg-red-500 hover:bg-red-700 cursor-pointer text-white py-2 px-4 rounded"
          : "bg-green-500 hover:bg-green-700 cursor-pointer text-white py-2 px-4 rounded"
        }
      >
        {isActive ? 'Deactivate Employee' : 'Activate Employee'}
      </button>
    );
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Error fetching employee:', error);
      } else {
        setEmployee({
          full_name: data.full_name,
          email: data.email,
          role: data.role,
          is_active: data.is_active
        });
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Edit Employee</h1>
      {/* Add your form or content for editing an employee here */}
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col border p-4 rounded-lg gap-4 w-full max-w-md">
        <label className="flex flex-col gap-1">
          Full Name:
          <input
            type="text"
            className="border p-2 rounded"
            value={employee.full_name}
            onChange={(e) => setEmployee({ ...employee, full_name: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          Email:
          <input
            type="email"
            className="border p-2 rounded"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          Role:
          <input
            type="text"
            className="border p-2 rounded"
            value={employee.role}
            onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
          />
        </label>
        {renderActivationButton()}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded">
          Save Changes
        </button>
        {/* Add a submit button and handle form submission */}
      </form>
    </main>
  );
}

export default EditEmployeePage;