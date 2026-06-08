type EmployeeType = {
    id: number;
    full_name: string;
    email: string;
    role: string;
}

type EmployeeTypeWithStatus = EmployeeType & {
    is_active?: boolean;
}

export type { EmployeeType, EmployeeTypeWithStatus };
export default EmployeeTypeWithStatus;