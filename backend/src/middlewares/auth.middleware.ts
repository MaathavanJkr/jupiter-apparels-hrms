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
  req: Request & { user_id: string },
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

      // Ensure decodedToken is an object and contains the role property
      if (
        typeof decodedToken === "object" &&
        (decodedToken as JwtPayload).role == "Admin"
      ) {
        req.user_id = decodedToken.user_id;
        next();
      }
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

// Middleware for User Authentication
export const userAuth = (
  req: Request & { user_id: string },
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

      req.user_id = (decodedToken as JwtPayload).user_id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};
