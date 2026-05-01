import { Schema, model, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number;
  iconUrl?: string | null;
}

const skillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 1, max: 100 },
  iconUrl: { type: String, default: null },
});

export const Skill = model<ISkill>("Skill", skillSchema);
