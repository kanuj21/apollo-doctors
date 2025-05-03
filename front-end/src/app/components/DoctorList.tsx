'use client';

import { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { Doctor } from '../types/doctor';
import { fetchDoctors } from '../lib/api';

type Props = {
  selectedFilters: string[];
};

const DoctorList = ({ selectedFilters }: Props) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const filters: any = {};

    // Parse experience filters
    const expFilters = selectedFilters
      .filter((f) => f.startsWith('exp-'))
      .map((f) => f.replace('exp-', ''));
    if (expFilters.length > 0) {
      filters.experience = expFilters;
    }

    // Parse fee filters
    const feeFilters = selectedFilters.filter((f) => f.startsWith('fee-'));
    if (feeFilters.length > 0) {
      const feeRanges = feeFilters.map((fee) => {
        const range = fee.replace('fee-', '');
        if (range === '1000+') return [1000, 100000];
        const [min, max] = range.split('-');
        return [parseInt(min), parseInt(max)];
      });

      const minFees = feeRanges.map((r) => r[0]);
      const maxFees = feeRanges.map((r) => r[1]);
      filters.minFee = Math.min(...minFees);
      filters.maxFee = Math.max(...maxFees);
    }

    // Parse language
    const languageMap: Record<string, string> = {
      'lang-en': 'English',
      'lang-hi': 'Hindi',
      'lang-te': 'Telugu',
    };
    const selectedLangs = selectedFilters
      .filter((f) => f.startsWith('lang-'))
      .map((f) => languageMap[f]);
    if (selectedLangs.length > 0) {
      filters.languages = selectedLangs;
    }

    // Mode of consult
    if (selectedFilters.includes('hospital')) filters.modeOfConsult = 'Hospital';
    if (selectedFilters.includes('online')) filters.modeOfConsult = 'Online';

    // Facility
    const facilityMap: Record<string, string> = {
      apollo: 'Apollo Hospital',
      other: 'Other Clinics',
    };
    const facilities = selectedFilters
      .filter((f) => f === 'apollo' || f === 'other')
      .map((f) => facilityMap[f]);
    if (facilities.length > 0) {
      filters.facility = facilities;
    }

    // Pagination
    filters.page = page;
    filters.limit = 5; // adjust as needed

    // Fetch doctors
    setLoading(true);
    fetchDoctors(filters)
      .then((res) => {
        setDoctors(res.data);
        setTotalCount(res.total);
        setTotalPages(res.pages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedFilters, page]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (doctors.length === 0) {
    return <div className="p-4 text-gray-500">No doctors found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>&#10222;{totalCount} Doctors Found&#10223;</h1>
      {doctors.map((doc) => (
        <DoctorCard key={doc._id} doctor={doc} />
      ))}

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoctorList;
