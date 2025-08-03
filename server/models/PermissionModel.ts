import mongooose from "mongoose";

const permissionSchema = new mongooose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface PermissionInterface {
  _id: string;
  name: string;
  collectionName: string;
}

export const DefaultPermissionInterface: PermissionInterface = {
  _id: "",
  name: "",
  collectionName: "",
};

export default mongooose.model("permission", permissionSchema);
