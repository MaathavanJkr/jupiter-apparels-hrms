import { RowDataPacket } from "mysql2";

export interface Organization extends RowDataPacket{
    organization_id: string;
    name: string;
    address: string;
    reg_no: number;
  }
  