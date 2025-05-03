// backend/src/utils/buildDoctorQuery.ts

import { FilterQuery } from 'mongoose';
import { IDoctor } from '../models/doctor.model';

type QueryParams = {
  modeOfConsult?: string[];
  experience?: string[];
  fee?: string[];
  language?: string[];
  facility?: string[];
  location?: string;
};

export const buildDoctorQuery = (filters: QueryParams): FilterQuery<IDoctor> => {
  const query: FilterQuery<IDoctor> = {};

  // Mode of consult
  if (filters.modeOfConsult && filters.modeOfConsult.length > 0) {
    query.modeOfConsult = { $in: filters.modeOfConsult };
  }

  // Experience
  if (filters.experience && filters.experience.length > 0) {
    const experienceConditions = filters.experience.map((range) => {
      if (range === '0-5') return { experience: { $gte: 0, $lte: 5 } };
      if (range === '6-10') return { experience: { $gte: 6, $lte: 10 } };
      if (range === '11-16') return { experience: { $gte: 11, $lte: 16 } };
      if (range === '16+') return { experience: { $gte: 17 } };
      return {};
    });
    query.$or = experienceConditions;
  }

  // Fee
  if (filters.fee && filters.fee.length > 0) {
    const feeConditions = filters.fee.map((range) => {
      if (range === '100-500') return { fee: { $gte: 100, $lte: 500 } };
      if (range === '500-1000') return { fee: { $gte: 500, $lte: 1000 } };
      if (range === '1000+') return { fee: { $gte: 1000 } };
      return {};
    });
    query.$and = (query.$and || []).concat([{ $or: feeConditions }]);
  }

  // Language
  if (filters.language && filters.language.length > 0) {
    query.language = { $in: filters.language };
  }

  // Facility
  if (filters.facility && filters.facility.length > 0) {
    query.facility = { $in: filters.facility };
  }

  // Location (Optional exact match or use regex for partial)
  if (filters.location) {
    query.location = new RegExp(filters.location, 'i'); // case-insensitive
  }

  return query;
};
