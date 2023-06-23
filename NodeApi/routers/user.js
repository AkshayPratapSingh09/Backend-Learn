import express from "express";
import { getAllUsers, getUserDetails, register } from "../controllers/users.js";


const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.get("/userid/:id", getUserDetails);

export default router;
