import EmployeeType from "@/types/employees";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Props = {
    employee: EmployeeType;
}

function EmployeeCard({employee}: Props) {

    return (
    <div key={employee.id} className="border p-4 rounded">
        <h2 className="text-2xl font-semibold">{employee.full_name}</h2>
        <p>Email: {employee.email}</p>
        <p>Role: {employee.role}</p>
        <Link
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2 inline-block"
            href={`/edit-employee/${employee.id}`}>
            Edit
        </Link>

    </div>
    )
}

export default EmployeeCard;