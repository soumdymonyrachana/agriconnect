import { UserModel } from "../models/userModel";
import { RoleModel } from "../models/roleModel";
import { UserRoleModel } from "../models/userRolemodel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { roleCheck } from "@/middleware/roleMiddleware";

export const Registerservice = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body; //It takes the user's details from the request body when they try to sign up.
    const existingUser = await UserModel.findOne({
      //Searches the database for any user with the same email.
      //If found → return an error:
      $or: [{ email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //Passwords are never stored in plain text.
    //bcrypt.hash() encrypts the password.

    const newUser = new UserModel({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userRole = await RoleModel.findOne({ name: "customer" });
    if (!userRole) {
      return res.status(500).json({ message: "Default user role not found" });
    }
    await UserRoleModel.create({
      userId: newUser._id,
      roleId: userRole._id,
      role: userRole.name,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      role: userRole.name,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const Loginservice = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }); // Find user by email

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" }); //If no user → throw error
    }
    //Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Fetch user role
    const fetchUserRole = await UserRoleModel.find({
      userId: user._id,
    }).populate("roleId");
    // const roles = fetchUserRole ? [(fetchUserRole.roleId as any).name] : [];
    const roles = fetchUserRole.map((ur) => (ur.roleId as any).name);

    //Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: roles,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login successful", data: user, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
