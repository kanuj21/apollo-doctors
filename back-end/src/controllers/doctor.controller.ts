// backend/src/controllers/doctor.controller.ts

import { Request, Response } from 'express';
import Doctor from '../models/doctor.model';
import { buildDoctorQuery } from '../utils/buildDoctorQuery';

// POST /api/doctors - Add a doctor
export const addDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add doctor' });
  }
};

// GET /api/doctors - List doctors with filters and pagination
export const getDoctorsWithFilters = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, ...rawFilters } = req.query;
  
      const filters: any = {};
      for (const key in rawFilters) {
        const value = rawFilters[key];
        filters[key] = Array.isArray(value) ? value : [value];
      }
  
      const query = buildDoctorQuery(filters);
  
      const skip = (Number(page) - 1) * Number(limit);
      const doctors = await Doctor.find(query).skip(skip).limit(Number(limit));
      const total = await Doctor.countDocuments(query);
  
      res.json({
        data: doctors,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch doctors' });
    }
  };
  
