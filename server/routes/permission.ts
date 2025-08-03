import express from "express"
const PermissionRoute = express.Router();
import { getPermissions, getPermissionsByTable, createPermission, updatePermission, deletePermission } from "../controllers/PermissionController";

PermissionRoute.get("/", getPermissions);
PermissionRoute.get("/ByTable", getPermissionsByTable);
PermissionRoute.post("/", createPermission);
PermissionRoute.put("/:id", updatePermission);
PermissionRoute.delete("/:id", deletePermission);

export default PermissionRoute;
