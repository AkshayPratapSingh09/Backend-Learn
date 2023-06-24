import express from "express";
import { getAllUsers, getUserDetails, login, register } from "../controllers/users.js";


const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);

router.get("/userid/:id", getUserDetails);

export default router;
