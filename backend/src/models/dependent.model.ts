import { RowDataPacket } from "mysql2";

export interface EmployeeDependent extends RowDataPacket {
    dependent_id: string,
    employee_id: string,
    name: string,
    relationship_to_employee: string,
    birth_date: string,
}