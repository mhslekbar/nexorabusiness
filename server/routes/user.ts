import express from "express"
const UserRoute = express.Router();
import { getUsers , insertUser, updateUser, deleteUser } from "../controllers/UserController"
import { authorizedPermission } from "../middlewares/authorizedPermission";

UserRoute.get("/" , authorizedPermission(["AFFICHER", "AFFICHER_LIST"], "UTILISATEURS"), getUsers);
UserRoute.post("/" , authorizedPermission(["AJOUTER"], "UTILISATEURS"), insertUser);
UserRoute.put("/:id" , authorizedPermission(["MODIFIER"], "UTILISATEURS"), updateUser);
UserRoute.delete("/:id" , authorizedPermission(["SUPPRIMER"], "UTILISATEURS"), deleteUser);

export default UserRoute;
