import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

// Helper function to extract token
const extractToken = (req: Request): string | undefined => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return undefined;
};

// Middleware for Admin Authentication
export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, No Token" });
  }

  try {
    jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized. Token Invalid" });
      }
      if ((decodedToken as JwtPayload).role == "Admin") {
      req.user = {
        id: (decodedToken as JwtPayload).user_id,
        role: (decodedToken as JwtPayload).role,
        employee_id: (decodedToken as JwtPayload).employee_id,
        isSupervisor: (decodedToken as JwtPayload).isSupervisor,
      };
      next();} else {
        console.log(decodedToken)
        return res
        .status(401)
        .json({ success: false, message: "Not authorized. User Access Denied" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Not authorized. Internal Error" });
  }
};

// Middleware for Manager Authentication
export const managerAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, No Token" });
  }

  try {
    jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized" });
      }
      if ((decodedToken as JwtPayload).role == "Manager" || (decodedToken as JwtPayload).role == "Admin") {
      req.user = {
        id: (decodedToken as JwtPayload).user_id,
        role: (decodedToken as JwtPayload).role,
        employee_id: (decodedToken as JwtPayload).employee_id,
        isSupervisor: (decodedToken as JwtPayload).isSupervisor,
      };
      next();} else {
        return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

// Middleware for User Authentication
export const userAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, No Token" });
  }

  try {
    jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized" });
      }

      req.user = {
        id: (decodedToken as JwtPayload).user_id,
        role: (decodedToken as JwtPayload).role,
        employee_id: (decodedToken as JwtPayload).employee_id,
        isSupervisor: (decodedToken as JwtPayload).isSupervisor,
      };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};
