import UerModel from "../models/userModel";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await UerModel.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.EMAIL_PASSWORD, 10);
    const adminUser = new UerModel({
      name: process.env.ADMIN_NAME,
      phone: process.env.ADMIN_PHONE,
      address: process.env.ADMIN_ADDRESS,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });
    // Save the admin user to the database
    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};
