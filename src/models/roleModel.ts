import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string; // optional description of the role
  createdAt?: Date;
  updatedAt?: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export const Role = mongoose.model<IRole>("Role", roleSchema);
