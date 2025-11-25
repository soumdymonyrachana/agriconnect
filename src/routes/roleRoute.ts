import { createRoleController } from "../controllers/roleController";
import Express from "express";

const router = Express.Router();

/**
 * @openapi
 * /role/create-role:
 *   post:
 *     tags:
 *       - Role
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               des:
 *                type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create-role", createRoleController);

export default router;
