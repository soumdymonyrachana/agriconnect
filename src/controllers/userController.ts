import { createUserService } from "../services/userService";
import { Request, Response } from "express";

/**
 * @swagger
 * /user/create-user:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
 *     description: Admin can create a new user by providing user details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Sok
 *               lastName:
 *                 type: string
 *                 example: Dara
 *               email:
 *                 type: string
 *                 format: email
 *                 example: dara@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongP@ss123
 *               phone:
 *                 type: string
 *                 example: "012345678"
 *               roleId:
 *                 type: string
 *                 example: "673c41d50e8b1fcd9e2a1234"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 673c41d50e8b1fcd9e2a5555
 *                     firstName:
 *                       type: string
 *                       example: Sok
 *                     lastName:
 *                       type: string
 *                       example: Dara
 *                     email:
 *                       type: string
 *                       example: dara@example.com
 *                     phone:
 *                       type: string
 *                       example: "012345678"
 *                     roleId:
 *                       type: string
 *                       example: "673c41d50e8b1fcd9e2a1234"
 *       400:
 *         description: Bad Request – Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 */

export const createUserController = async (req: Request, res: Response) => {
  //   console.log("===work=====");
  const result = await createUserService(req, res);
  return result;
};
