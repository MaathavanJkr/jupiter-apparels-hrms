import { RowDataPacket } from "mysql2";

export interface LeaveApplication extends RowDataPacket{
    application_id: string;  
    employee_id: string;  
    leave_type: 'Annual' | 'Casual' | 'Maternity' | 'Nopay';  
    start_date: Date;      
    end_date: Date;     
    reason: string;    
    submission_date: Date;  
    status: 'Pending' | 'Approved' | 'Rejected';   
    response_date: Date | null; 
  }
 