import { RowDataPacket } from "mysql2";

export interface Organization extends RowDataPacket{
    org_id: number;
    name: string;
    address: string;
    reg_no: number;
  }
  