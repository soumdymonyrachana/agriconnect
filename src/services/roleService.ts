import { RoleModel } from "../models/roleModel";
import { Request, Response } from "express";
// import { JwtPayload } from "jsonwebtoken";

export const createRoleService = async (req: Request, res: Response) => {
  try {
    // const userId = req.user?.userId; // Assuming userId is attached to req.user
    const { name, des } = req.body;
    const existName = await RoleModel.findOne({ name });

    if (existName) {
      return res.status(400).json({ message: "Role name already exists" });
    }

    const newRole = new RoleModel({
      name,
      des,
    });

    await newRole.save();

    return res
      .status(201)
      .json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
