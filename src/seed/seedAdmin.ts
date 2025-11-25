import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await UserModel.findOne({
      email: process.env.EMAIL_ADMIN,
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.PASSWORD_ADMIN!, 10);

    const newAdmin = new UserModel({
      firstName: process.env.FIRSTNAME_ADMIN,
      lastName: process.env.LASTNAME_ADMIN,
      phone: process.env.PHONE_ADMIN,
      email: process.env.EMAIL_ADMIN,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};
