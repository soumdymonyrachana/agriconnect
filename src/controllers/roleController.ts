import { Request, Response } from "express";
import { createRoleService } from "../services/roleService";

/**
 * @swagger
 * /create-role:
 *   post:
 *     tags: [Role]
 *     summary: Create a new role
 *     description: Create a new role by providing a role name and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - des
 *             properties:
 *               name:
 *                 type: string
 *                 example: admin
 *               des:
 *                 type: string
 *                 example: Administrator role with full access
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Invalid request body or duplicate role
 *       500:
 *         description: Internal server error
 */

export const createRoleController = async (req: Request, res: Response) => {
  const result = await createRoleService(req, res);
  return result;
};
