import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    user_id: string,
    employee_id: number,
    role: string,
    username: string,
    password: string,
}