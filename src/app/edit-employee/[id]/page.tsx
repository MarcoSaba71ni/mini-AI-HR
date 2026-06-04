"use client";
import {useState , useEffect} from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from "@/lib/supabase";

function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    full_name: '',
    email: '',
    role: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.from('employees')
      .update({
        full_name: employee.full_name,
        email: employee.email,
        role: employee.role
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating employee:', error);
    } else {
      router.push('/employees'); // Redirect to the employees list page after successful update
    }
  }



  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching employee:', error);
      } else {
        setEmployee(data);
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
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded">
          Save Changes
        </button>
        {/* Add a submit button and handle form submission */}
      </form>
    </main>
  );
}

export default EditEmployeePage;