// src/types/doctor.ts

export interface Doctor {
  _id: string;
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
  facility: 'Apollo Hospital' | 'Other Clinics';
  modeOfConsult: 'Hospital' | 'Online';
}
