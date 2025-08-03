import mongoose from "mongoose"
import { DefaultRoleInterface, RoleInterface } from "./RoleModel"

const userSchema = new mongoose.Schema({
    store: { type: mongoose.Types.ObjectId, ref: "store" },
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String },
    roles: [
        {
            type: mongoose.Types.ObjectId,
            ref: "role",
            required: true
        }
    ]
}, {
    timestamps: true
})

export interface UserInterface {
  _id: any,
  username: string,
  password: string,
  phone: string,
  roles: RoleInterface[]
}

export const DefaultUserInterface: UserInterface = {
  _id: "",
  username: "",
  password: "",
  phone: "",
  roles: [DefaultRoleInterface]
}

export default mongoose.model("user", userSchema)
