// backend/src/routes/doctor.routes.ts

import express from 'express';
import {
  addDoctor,
  getDoctorsWithFilters,
} from '../controllers/doctor.controller';

const router = express.Router();

// Route: Add a new doctor
router.post('/', addDoctor);

// Route: Get doctors with filters and pagination
router.get('/', getDoctorsWithFilters);

export default router;
