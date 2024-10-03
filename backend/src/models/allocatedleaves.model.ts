import { RowDataPacket } from "mysql2";

export interface AllocatedLeaves extends RowDataPacket{
    pay_grade_id : string;
    annual_leaves : number;
    casual_leaves : number;
    maternity_leaves : number;
    no_pay_leaves : number;
  }
  
  
