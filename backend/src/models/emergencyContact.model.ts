import { RowDataPacket } from "mysql2";

export interface EmergencyContact extends RowDataPacket {
    emergency_id: number,
    employee_id: number,
    name: string,
    relationship: string,
    contact_number: string,
    address: string,
}