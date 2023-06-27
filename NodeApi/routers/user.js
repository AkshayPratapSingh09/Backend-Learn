import express from "express";
import { getAllUsers, getMyProfile, getUserDetails, login, logout, register } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me",isAuthenticated, getMyProfile);

router.get("/userid/:id", getUserDetails);

export default router;
