import mongoose from "mongoose";
import { RoleModel as Role } from "../models/roleModel";
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/agri-db";

async function seedRoles() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    const roles = ["admin", "farmer", "customer"];

    for (const name of roles) {
      const existing = await Role.findOne({ name });
      if (!existing) {
        await Role.create({ name });
        console.log(`Role created: ${name}`);
      } else {
        console.log(`Role already exists: ${name}`);
      }
    }

    console.log("Roles seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Role seeding error:", error);
    process.exit(1);
  }
}

seedRoles();
