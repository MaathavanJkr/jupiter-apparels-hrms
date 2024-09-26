import {RowDataPacket} from "mysql2";

export interface Department extends RowDataPacket{
    department_id: number;
    name: string;
}