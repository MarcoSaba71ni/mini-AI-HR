import type { EmployeeTypeWithStatus } from "@/types/employees";
import Link from "next/link";

type Props = {
    employee: EmployeeTypeWithStatus;
    rowClassName?: string;
}

function EmployeeCard({ employee, rowClassName }: Props) {

    return (
    <tr key={employee.id} className={`group ${rowClassName ?? ""}`}>
        <td className="px-6 py-4">{employee.full_name}</td>
        <td className="px-6 py-4">{employee.email}</td>
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
        <td className="px-6 py-4 text-right">
            <Link
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold py-1.5 px-3 rounded"
                href={`/edit-employee/${employee.id}`}
            >
                Edit
            </Link>
        </td>
    </tr>
    )
}

export default EmployeeCard;