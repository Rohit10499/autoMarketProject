import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controllers.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

export default router;
