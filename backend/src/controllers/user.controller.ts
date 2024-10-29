import { Request, Response } from "express";
import { ChangePasswordModel, createUserModel, deleteUserModel, getUserByIDModel, getAllUsersModel, updateUserModel, User } from "../models/user.model";
import { comparePassword } from "../utils/hashPassword";



export const createUser = async (req: Request, res: Response) => {
  const { employee_id, role, username, password } = req.body;

  if (!employee_id || !role || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const user: User =  {
    employee_id: employee_id as string,
    role: role as string,
    username: username as string,
    password: password as string,
  } as User;

  await createUserModel(user)
  .then((result)=>{
    console.log("result -> ",result)
    console.log("Successfully added.")
    return res.status(201).json(result);
  }).catch((error)=> {
    console.log("Error -> ",error)
    return res.status(500).json({error: error});
  });

};

export const getUserByID = async (req: Request, res: Response) => {
  const id = req.params.id;

  await getUserByIDModel(id)
  .then((result)=>{ 
    return res.status(200).json(result);
  }).catch((error)=> {  
    return res.status(500).json({error: error});
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersModel(); // Fetch the user data from the model

    // Check if the result is in the expected format
    if (Array.isArray(result.data)) {
      res.status(200).json({ users: result.data }); // Send the users as response
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({ message: "All users found" });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { role, username} = req.body;
  const user: User = {
    user_id: id,
    role: role,
    username: username
  } as User;

  if (!role || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  await updateUserModel(user)
  .then((result)=>{
    return res.status(200).json(result);
  }).catch((error)=> { 
    return res.status(500).json({error: error});
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  await deleteUserModel(id)
  .then((result)=> {
    return res.status(200).json(result);
  })
  .catch((error)=>{
    return res.status(500).json({error: error});
  })
};

export const changePassword = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user : User = await getUserByIDModel(id).then((result)=> {
    return result.data}).catch((error)=> {
    return res.status(500).json({error: error});
    });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const passwordMatch = await comparePassword(old_password, user.password);
  if (passwordMatch) { // need to add decyption here
    return res.status(401).json({ error: "Old Password doesnot match" });
  }

  await ChangePasswordModel(id, new_password)
  .then((result)=> {
    return res.status(200).json(result);
  }).catch((error)=> {
    return res.status(500).json({error: error});
  });

};

// Need to Implement the above functions
 
