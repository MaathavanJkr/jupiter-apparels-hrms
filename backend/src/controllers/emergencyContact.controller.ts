import { Request, Response } from "express";
import {
    EmergencyContact,
    createEmergencyContactModel,
    deleteEmergencyContactModel,
    getAllEmergencyContactsModel,
    getEmergencyContactByIDModel,
    updateEmergencyContactModel,
    getEmergencyContactByEmployeeIDModel,
    
} from "../models/emergencyContact.model"

export const createEmergencyContact = async (req:Request, res:Response) => {
    const {employee_id, name, relationship, contact_number, address} = req.body;
    
    if (!employee_id || !name || !relationship || !contact_number || !address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const emergencyContact: EmergencyContact = {
        employee_id: employee_id as string,
        name: name as string,
        relationship: relationship as string,
        contact_number: contact_number as string,
        address: address as string,
       
      } as EmergencyContact;
    
      await createEmergencyContactModel(emergencyContact)
        .then((result) => {
          return res.status(201).json(result);
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    };

export const getAllEmergencyContacts = async (req: Request, res: Response) => {
    await getAllEmergencyContactsModel()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getEmergencyContactByID = async (req:Request, res:Response) => {
    const { id } = req.params;

  await getEmergencyContactByIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const updateEmergencyContact = async (req: Request, res:Response) => {
    const { id } = req.params;
    const { employee_id, name, relationship, contact_number, address} = req.body;
    
    await getEmergencyContactByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      const contact = result.data;
      if (employee_id) contact.employee_id = employee_id;
      if (name) contact.name = name;
      if(relationship) contact.relationship = relationship;
      if(contact_number) contact.contact_number = contact_number;
      if (address) contact.address = address;
      

      await updateEmergencyContactModel(contact)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const deleteEmergencyContact = async (req:Request, res:Response) => {
    const { id } = req.params;

  await getEmergencyContactByIDModel(id)
    .then(async (result) => {
      if (!result.data) {
        return res.status(404).json(result);
      }
      await deleteEmergencyContactModel(id)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

export const getEmergencyContactByEmployeeID = async  (req:Request, res:Response) => {
    const { id } = req.params;

  await getEmergencyContactByEmployeeIDModel(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
