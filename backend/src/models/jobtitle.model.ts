import { RowDataPacket } from "mysql2";

export interface JobTitle extends RowDataPacket{
    job_title_id: string;
    title: string;
  }
  