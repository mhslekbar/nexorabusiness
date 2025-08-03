import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import expressMongoSanitize from "express-mongo-sanitize"
import mongoose from "mongoose";

import AuthRoute from './routes/auth';
import UserRoute from './routes/user';
import PermissionRoute from './routes/permission';
import RoleRoute from './routes/role';
import { verifyToken } from './middlewares/verifyToken';
import { setCacheControl } from './middlewares/setCacheControl';

const app = express();

dotenv.config();

const port = Number(3022) || process.env.PORT;

// start database connection
mongoose.connect(process.env.MONGO_URL ?? "")
mongoose.connection.once('connected', () => {
  console.log("db connected succesfully")
})


const corsOptions = {
  // origin: "http://localhost:3030",
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

// Middleware to sanitize input and output to and from MongoDB
app.use(expressMongoSanitize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))


app.use("/api/auth", setCacheControl, AuthRoute)
app.use("/api/user", verifyToken, setCacheControl, UserRoute)
app.use("/api/permission", verifyToken, setCacheControl, PermissionRoute)
app.use("/api/role", verifyToken, setCacheControl, RoleRoute)


app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// run app npx tsx app.ts
