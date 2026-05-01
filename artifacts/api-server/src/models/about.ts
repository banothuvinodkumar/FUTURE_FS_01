import { Schema, model, Document } from "mongoose";

export interface IAbout extends Document {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
  photoUrl?: string | null;
  yearsExperience?: number | null;
  availability?: string | null;
}

const aboutSchema = new Schema<IAbout>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: null },
  location: { type: String, default: null },
  githubUrl: { type: String, default: null },
  linkedinUrl: { type: String, default: null },
  resumeUrl: { type: String, default: null },
  photoUrl: { type: String, default: null },
  yearsExperience: { type: Number, default: null },
  availability: { type: String, default: null },
});

export const About = model<IAbout>("About", aboutSchema);
