import { Router } from "express";
import { logIn, logOut, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register)

router.post("/login", logIn)

router.post("/logout", logOut)

export default router;