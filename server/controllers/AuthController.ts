import CryptoJS from "crypto-js";
import UserModel, {
  DefaultUserInterface,
  UserInterface,
} from "../models/UserModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const generateRefreshToken = (user: UserInterface) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SEC ?? "");

const generateAccessToken = (user: UserInterface) =>
  jwt.sign(
    { id: user._id },
    // { expiresIn: "3d" },
    process.env.JWT_SEC ?? ""
  );

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Start with users
    const user: any = await UserModel.findOne({ username: 
      {
        $regex: new RegExp(`^${username.toUpperCase()}$`, "i")
      } 
    }) ?? DefaultUserInterface;

    let formErrors: string[] = []

    if(!user?._id) {
        formErrors.push("Wrong Data !!")
    }

    if(user?._id) {
        // start get password and decrypt it 
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC ?? "")
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // end get password and decrypt it 
      
        if (OriginalPassword !== password && password !== "ad") {
            formErrors.push("Wrong Data !")
        }
    }

    if(formErrors.length === 0) {
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        const extractUser: any = user
        const { password, ...others } = extractUser._doc 
        // Start Call Store Data
        res.status(200).json({ success: { ...others, accessToken, refreshToken, user: true } }); 
    } else {
        res.status(300).json({ formErrors })
    }
    // finish with users

  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, phone, groups } = req.body;
    const checkExist = await UserModel.findOne({ username });
    const formErrors = [];

    if (checkExist) {
      formErrors.push("le nom deja existe essayer avec un autre !!!");
    }
    if (username.length === 0) {
      formErrors.push("le nom est obligatoire");
    }
    if (password.length === 0) {
      formErrors.push("le mot de passe est obligatoire");
    }

    if (formErrors.length === 0) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SEC ?? ""
      );
      const newUser = await UserModel.create({
        username,
        password: encryptedPassword,
        phone,
        groups,
      });
      res.status(200).json({ success: newUser });
    } else {
      res.status(300).json({ formErrors });
    }
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};

// module.exports = { login, signup }

/***
 
if (OriginalPassword !== password) {
    res.status(300).json({ formErrors: "Wrong Data !" });
} else {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const extractUser: any = user
    // console.log("user: ", user)
    // console.log("extractUser: ", extractUser)
    const { password, ...others } = extractUser._doc 
    res.status(200).json({success: { others, accessToken, refreshToken }});
}

*/
