import { Router } from "express";
import authRoute from "./ authRoutes";
import roleRoute from "./roleRoute";
import userRoute from "./userRoute"; // make sure this is correct

const router = Router();

router.use("/auth", authRoute);
router.use("/role", roleRoute);
router.use("/", userRoute);

export default router;
