import { RowDataPacket } from "mysql2";
import db from "../database/database";
import { Output } from "./output.model";

export interface customAttribute extends RowDataPacket {
    custom_attribute_key_id: number;
    name: string;
}

export const getCustomAttributeModel = async (): Promise<Output> => {
    try {
        const [result] = await db
        .promise()
        .query<RowDataPacket[][]>("CALL GetAllCustomAttributes()");

        if (Array.isArray(result) && result.length === 0) {
            throw { data: null, error: "Custom Attributes not found", message: null };
        } else {
            return {
                data: (result[0] as customAttribute[]),
                error: null,
                message: null,
            };
        }
    } catch (error) {
        throw {
            data: null,
            error: error,
            message: "Database Query Failed", 
        };
    } 
};
export const getCustomAttributeByIDModel = async (
    attribute_no: number
): Promise<Output> => {
    try {
        const [result] = await db
        .promise()
        .query<RowDataPacket[][]>("CALL GetCustomAttributeByKey(?)", [attribute_no]);

        if (Array.isArray(result) && result.length === 0) {
            throw { data: null, error: "Custom Attribute not found", message: null };
        } else {
            return {
                data: (result[0] as customAttribute[])[0],
                error: null,
                message: null,
            };
        }
    } catch (error) {
        throw {
            data: null,
            error: error,
            message: "Database Query Failed",
        };
    } 
};