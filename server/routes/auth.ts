import express from "express"
import { login, signup } from "../controllers/AuthController"
const AuthRoute = express.Router();

AuthRoute.post("/login", login);
AuthRoute.post("/signup", signup);

export default AuthRoute;
