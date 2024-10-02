import { RowDataPacket } from "mysql2";

export interface Branch extends RowDataPacket{
    branch_id: number;
    name: string;
    address: string;
    contact_number: string;
    manager_id : number;
}