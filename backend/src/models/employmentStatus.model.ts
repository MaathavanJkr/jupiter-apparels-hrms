import { RowDataPacket } from "mysql2";

export interface EmploymentStatus extends RowDataPacket {
    employment_status_id: string,
    status: string,
}