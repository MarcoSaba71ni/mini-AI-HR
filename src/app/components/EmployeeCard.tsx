import EmployeeType from "@/types/employees";
import { supabase } from "@/lib/supabase";

type Props = {
    employee: EmployeeType;
}

function EmployeeCard({employee}: Props) {

    return (
    <div key={employee.id} className="border p-4 rounded">
        <h2 className="text-2xl font-semibold">{employee.full_name}</h2>
        <p>Email: {employee.email}</p>
        <p>Role: {employee.role}</p>
    </div>
    )
}

export default EmployeeCard;