import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  category: string;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: null },
    liveUrl: { type: String, default: null },
    imageUrl: { type: String, default: null },
    featured: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const Project = model<IProject>("Project", projectSchema);
