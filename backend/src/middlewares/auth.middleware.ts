// import { Request, Response, NextFunction } from "express";
// const jwt = require("jsonwebtoken");
// const config = require("../config");

// export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token from the header
//       token = req.headers.authorization.split(" ")[1];
//       // Verify
//       jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
//         if (err) {
//           return res
//             .status(401)
//             .json({ sucess: false, message: "Not authorized" });
//         } else {
//           if (decodedToken.role !== "admin") {
//             return res
//               .status(401)
//               .json({ sucess: false, message: "Not authorized" });
//           } else {
//             req.user = decodedToken;
//             next();
//           }
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(401).json({ sucess: false, message: "Not authorized" });
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ sucess: false, message: "Not authorized, No Token" });
//   }
// };

// exports.userAuth = (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token from the header
//       token = req.headers.authorization.split(" ")[1];
//       // Verify
//       jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
//         if (err) {
//           return res
//             .status(401)
//             .json({ sucess: false, message: "Not authorized" });
//         } else {
//           if (decodedToken.role) {
//             req.user = decodedToken;
//             next();
//           } else {
//             return res
//               .status(401)
//               .json({ sucess: false, message: "Not authorized" });
//           }
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(401).json({ sucess: false, message: "Not authorized" });
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ sucess: false, message: "Not authorized" });
//   }
// };
