import { Response } from "express";
import UserModel from "../models/UserModel"

export const authorizedPermission = (permission: any = [], collectionName: any) => {
  return async (req: any, res: Response, next: any) => {
    const { id } = req.user;
    const users: any = await UserModel.findById(id).populate("roles");
    if (!users)
      return res.status(301).json({ finishSubscription: `votre abonnement est terminé veillez nous contacter s'il vous plait pour charger votre compte` })
    let hasPermission = false;
    for (const role of users.roles || []) {
      const populatedRole = await role.populate("permissions");
      if (
        populatedRole.permissions.find((p: any) => permission.includes(p.name) && p.collectionName === collectionName)
      ) {
        hasPermission = true;
        break;
      }
    }

    if (hasPermission) {
      return next();
    } else {
      return res
        .status(300)
        .json(`Vous n'etes pas autoriser à : ${permission[0]?.toLowerCase()} ${collectionName.toLowerCase()}`); // 
    }


  }
};
