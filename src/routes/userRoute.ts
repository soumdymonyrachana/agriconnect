import { createUserController } from "../controllers/userController";
import Express from "express";

const router = Express.Router();

/**
 * @openapi
 * /api/v1/create-user:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
router.post("/create-user", createUserController);

export default router;
