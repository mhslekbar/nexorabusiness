import { Request, Response } from "express";
import UserModel from  "../models/UserModel"
import CryptoJS from "crypto-js"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({ }, {password: 0}).sort({createdAt: -1}).populate("roles");
        res.status(200).json({ success: users });
    } catch(err: any) {
        res.status(500).json({err: err.message})
    }
}

export const insertUser = async (req: Request, res: Response) => {
    try {
        const formErrors = [];
        let { username, phone, password, roles} = req.body;
        const userData: any = await UserModel.findOne({ username });

        if(userData) {
            formErrors.push("Nom d'utilisateur existe deja");
        }
        if(!username || username.length === 0) {
            formErrors.push("Username Can't be empty");
        }
        if(!password || password.length === 0) {
            formErrors.push("Password Can't be empty");
        } else {
            let checkPass = CryptoJS.enc.Utf8.parse(password);
            password = CryptoJS.AES.encrypt(
                checkPass,
                process.env.PASS_SEC ?? ""
            ).toString()
        }
        if(!phone || phone.length === 0) {
            formErrors.push("Phone Can't be empty");
        }
        if(!roles || roles.length === 0) {
            formErrors.push("Choisir au moins un groupe");
        }
        if(formErrors.length === 0) {
            await UserModel.create({ username, password, phone, roles });
            await getUsers(req, res)
        } else {
            res.status(300).json({formErrors})
        }
    } catch(err: any) {
        res.status(500).json(err.message)
    }
}

export const updateUser = async (req: Request, res: Response) => { 
    let { id } = req.params
    let { username, phone, password, roles } = req.body
    const userData:any = await UserModel.findOne({ _id:{ $ne: id },  username });

    try {
        const formErrors = [];
        if(userData) {
            formErrors.push("Nom d'utilisateur existe deja");
        }
        if(!username || username.length === 0) {
          username = userData.username
        }
        if(username.length > 10) {
            formErrors.push("username can't be more than 10 chars")
        }
        if(!phone || phone.length === 0) {
            phone = userData.phone
        }
        if(!password || password.length === 0) {
            password = userData?.password
        }
        if(!roles || roles.length === 0) {
            roles = userData.roles
        }
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC ?? "").toString()

        if(formErrors.length === 0) {
            await UserModel.updateOne({_id: id}, {$set : { username, phone, password: encryptedPassword,  roles }}, { new: true });
            await getUsers(req, res)
        } else {
            res.status(300).json({formErrors})
        }
    } catch(err: any) {
        console.log("err: ", err)
        res.status(500).json({err: err.message})
    }
}

export const deleteUser = async (req: Request, res: Response) => { 
    let { id } = req.params;
    try {
        const formErrors: any = [];
        // START CHECK IF USER IS INSIDE OTHERS DOCUMENTS ?
        // END CHECK IF USER IS INSIDE OTHERS DOCUMENTS ?
        if(formErrors.length === 0) {
            await UserModel.deleteOne({ _id: id });
            await getUsers(req, res)
        } else {
            res.status(300).json({"formErrors": formErrors})
        }
    } catch(err: any) {
        res.status(500).json(err.message)
    }
}

