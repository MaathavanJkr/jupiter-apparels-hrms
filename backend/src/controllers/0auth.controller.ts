import bcrypt from "bcryptjs";
import config from "../config/config";
import { JWTToken } from "../models/0auth.model";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

// login
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are required");
  }
  return res.status(200).send({ message: "successfully logged in" });
//   const CheckUser = "SELECT * FROM users WHERE username = ?";
//   connection.query(CheckUser, [username], async (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     if (results.length === 0) {
//       return res.status(400).send("User does not exists");
//     }

//     const user = results[0];
//     const isvalid = await bcrypt.compare(password, user.password);

//     if (!isvalid) {
//       return res.status(400).send("Incorrect password. Try again!");
//     }

//     const token = generateJwtToken(user.id, user.username);
//     return res.status(200).send({ message: "successfully logged in", token });
//   });
};


// Generate JWT
const generateJwtToken = (data: JWTToken) => {
    const maxAge = 31 * 24 * 60 * 60;
    return jwt.sign(data, config.jwtSecret, {
      expiresIn: maxAge,
    });
  };
  
export { loginUser as login };
