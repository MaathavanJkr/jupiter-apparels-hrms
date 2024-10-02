// import bcrypt from "bcryptjs";
import config from "../config/config";
import { JWTToken } from "../models/0auth.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByUsernameModel } from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";

// login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }

  const { user, error } = await getUserByUsernameModel(username);
  if (error) {
    return res.status(400).send({ error });
  }

  if (user === null) {
    return res.status(400).send({ error: "User does not exists" });
  }

  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword);

  //need to use hashed password when checking
  const isvalid = user.password === password;

  if (isvalid) {
    return res.status(200).send({
      error: null,
      message: "successfully logged in",
      token: generateJwtToken({
        username: user.username,
        user_id: user.user_id,
        role: user.role,
      }),
    });
  } else {
    console.log(user);
    return res
      .status(400)
      .send({ error: "Incorrect password. Try again!", data: user });
  }

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
export const generateJwtToken = (data: JWTToken) => {
  //sets maxAge to 24 hours
  const maxAge = 24 * 60 * 60;
  return jwt.sign(data, config.jwtSecret, {
    expiresIn: maxAge,
  });
};