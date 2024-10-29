import { Request, Response } from "express";

import {
    getCustomAttributeModel,
    getCustomAttributeByIDModel,
} from "../models/customAttribute.model";

export const getCustomAttribute = async (req: Request, res: Response) => {
   await getCustomAttributeModel()
   .then((result)=> {
         return res.status(200).json(result);
   }).catch((error) => {
            return res.status(500).json({error});
   })
};

export const getCustomAttributeByID = async (req: Request, res: Response) => {
    const { attribute_no } = req.params;
    const attr_no = parseInt(attribute_no);
    if (isNaN(attr_no) || attr_no < 1 || attr_no > 3) {
        return res.status(400).json({ error: "Invalid attribute number" });
    }
    await getCustomAttributeByIDModel(attr_no)
    .then((result)=> {
        return res.status(200).json(result);
    }).catch((error) => {
        return res.status(500).json({error});
    })
};