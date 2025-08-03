import mongoose from  "mongoose"
import { DefaultPermissionInterface, PermissionInterface } from "./PermissionModel";

const RoleSchema = new mongoose.Schema({
    store: { type: mongoose.Types.ObjectId, ref: "store" },
    name: {
        type: String,
        required: true
    },
    permissions: [
        {
            type: mongoose.Types.ObjectId,
            ref: "permission",
            required: true
        }
    ]
},
{ timestamps: true });


export interface RoleInterface {
  _id: string,
  name: string,
  permissions: PermissionInterface[]
}

export const DefaultRoleInterface:RoleInterface = {
  _id: "",
  name: "",
  permissions: [DefaultPermissionInterface]
}

export default mongoose.model("role", RoleSchema);
