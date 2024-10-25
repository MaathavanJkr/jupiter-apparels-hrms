import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";


export const getAllSupervisorIDModel = async (): Promise<Output> => {
    try {
        const [result] = await db
            .promise()
            .query<RowDataPacket[][]>("CALL GetAllSupervisorIDs()");
        return {
            data: result[0],
            error: null,
            message: null,
        };
    } catch (error) {
        return {
            data: null,
            error,
            message: "Database Query Failed",
        };
    }
};