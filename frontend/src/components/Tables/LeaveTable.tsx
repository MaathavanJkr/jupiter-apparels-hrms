import { useEffect, useState } from "react"
import { LeaveApplication } from "../../types/types";

const LeaveTable = (employee_id:string) => {
    const [leaves, setLeaves] = useState<LeaveApplication[]>([]);

    useEffect(()=> {
        
    },[])
  return (
    <></>
  )
}

export default LeaveTable
