import { Request, Response } from "express"
import PermissionModel from "../models/PermissionModel"
import UserModel from "../models/UserModel"

export const getPermissions = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query  
        let permission
        if(userId) {
            const userData: any = await UserModel.findOne({ _id: userId }).populate({
                path: "roles",
                populate: {
                    path: "permissions"
                }
            })
            let allowedPermission = []
            for(let grp of userData.roles) {
                allowedPermission.push(grp.permissions)
            }
            permission = allowedPermission[0]
        } else {
            permission = await PermissionModel.find().sort({ createdAt: -1})
        }
        res.status(200).json({success: permission});
    } catch (err: any) {
        res.status(500).json({ err: err.message})
    }
}

export const getPermissionsByTable = async (req: Request, res: Response) => {
    try {
        const permission = await PermissionModel.aggregate([
            { 
                $project: {
                    createdAt: 1, 
                    collectionName: 1
                }
            },
            {$group: {
                _id: "$collectionName",  
                data: { $push: "$$ROOT" }              
            }},
            {$sort: {"data.createdAt": -1}},
        ]);
        res.status(200).json({ success: permission });
    } catch (err) {
        res.status(500).json({err})
    }
}

export const createPermission = async (req: Request, res: Response) => {
    try {
        const formErrors = [];
        const { name, collectionName } = req.body 

        const PermissionData = await PermissionModel.findOne({ name, collectionName });

        if(PermissionData) {
            formErrors.push("Le nom du Permission deja existe");
        }
        if(name.length === 0) {
            formErrors.push("Le nom du Permission est obligatoire");
        }
        if(collectionName.length === 0) {
            formErrors.push("Le choix du nom de la collection est obligatoire");
        }
        if(formErrors.length === 0) {
          await PermissionModel.create(req.body);
          await getPermissions(req, res)
        } else {
          res.status(300).json({formErrors});
        }
    } catch (err) {
        res.status(500).json({err})
    }
}


export const createManyPermission = async (req: Request, res: Response) => {
    try {
        const formErrors = [];

        const { permissions } = req.body 

        permissions.map(async (permission: any) => {
            const PermissionData = await PermissionModel.findOne({ name: permission.name, collectionName: permission.collectionName });

            if(PermissionData) {
                formErrors.push("Le nom du Permission deja existe");
            }
            if(permission.name.length === 0) {
                formErrors.push("Le nom du Permission est obligatoire");
            }
            if(permission.collectionName.length === 0) {
                formErrors.push("Le choix du nom de la collection est obligatoire");
            }
            
            await PermissionModel.create(permission);
        })

        await getPermissions(req, res)

    } catch (err) {
        res.status(500).json({err})
    }
}


export const updatePermission = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        let { name, collectionName } = req.body 
        const formErrors = [];

        const checkPermission = await PermissionModel.findOne({ _id: {$ne: id}, name , collectionName});
        const PermissionData: any = await PermissionModel.findOne({ name });

        if(checkPermission) {
          formErrors.push("Le nom du Permission deja existe");
        }
        if(name.length === 0) {
            name = PermissionData.name
        }
        if(collectionName.length === 0) {
            collectionName = PermissionData.collectionName
        }
        if(formErrors.length === 0) {
          await PermissionModel.updateOne({_id: id}, {$set: req.body}, {new: true});
          await getPermissions(req, res)
        } else {
          res.status(300).json({formErrors});
        }
    } catch (err) {
      res.status(500).json({err})
    }
}

export const deletePermission = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await PermissionModel.deleteOne({_id: id});
        await getPermissions(req, res)
      } catch (err) {
        res.status(500).json({err})
    }
}

export const deleteAllPermission = async (req: Request, res: Response) => {
    try {
        await PermissionModel.deleteMany();
        await getPermissions(req, res)
      } catch (err) {
        res.status(500).json({err})
    }
}
