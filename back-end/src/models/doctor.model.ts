// backend/src/models/doctor.model.ts

import mongoose, { Schema, Document } from 'mongoose';

// Enums for fixed values
export enum Facility {
  APOLLO = 'Apollo Hospital',
  OTHER = 'Other Clinics',
}

export enum ModeOfConsult {
  HOSPITAL = 'Hospital',
  ONLINE = 'Online',
}

export interface IDoctor extends Document {
  name: string;
  speciality: string;
  experience: number;
  degree: string;
  location: string;
  clinicAddress: string;
  fee: number;
  cashback: number;
  imageUrl?: string;
  language: string[];
  facility: Facility;
  modeOfConsult: ModeOfConsult;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    experience: { type: Number, required: true },
    degree: { type: String, required: true },
    location: { type: String, required: true },
    clinicAddress: { type: String, required: true },
    fee: { type: Number, required: true },
    cashback: { type: Number, required: true },
    imageUrl: { type: String },
    language: [{ type: String, required: true }],
    facility: {
      type: String,
      enum: Object.values(Facility),
      required: true,
    },
    modeOfConsult: {
      type: String,
      enum: Object.values(ModeOfConsult),
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
