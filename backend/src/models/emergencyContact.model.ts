import { RowDataPacket } from "mysql2";

export interface EmergencyContact extends RowDataPacket {
    emergency_id: string,
    employee_id: string,
    name: string,
    relationship: string,
    contact_number: string,
    address: string,
}