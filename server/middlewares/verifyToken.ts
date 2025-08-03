import { Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: Response, next: any) => {
  const authHeaders: any = req.headers.token;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    if (token === "public") {
      return next();
    }
    //   console.log("token: ", token)
    jwt.verify(token, process.env.JWT_SEC ?? "", (err: any, user: any) => {
      if (err) {
        return res.status(300).json("Token is not valid!!");
      } else {
        req.user = user;
        return next();
      }
    });
  } else {
    return res.status(300).json("You are not authenticated!!");
  }
};
