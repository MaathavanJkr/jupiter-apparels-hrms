import { RowDataPacket } from "mysql2";

export interface PayGrade extends RowDataPacket{
    pay_grade_id: string;
    paygrade:number;
    grade_name: string;
  }
  