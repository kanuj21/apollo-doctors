'use client';

import { useState } from 'react';

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddDoctorForm({ onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    experience: 0,
    degree: '',
    location: '',
    clinicAddress: '',
    fee: 0,
    cashback: 0,
    language: '',
    facility: 'Apollo Hospital',
    modeOfConsult: 'Hospital',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience' || name === 'fee' || name === 'cashback' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      language: formData.language.split(',').map((lang) => lang.trim()),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess?.();
      onClose();
    } else {
      alert('Failed to add doctor.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
          {[
            { label: 'Name', name: 'name' },
            { label: 'Speciality', name: 'speciality' },
            { label: 'Degree', name: 'degree' },
            { label: 'Location', name: 'location' },
            { label: 'Clinic Address', name: 'clinicAddress' },
            { label: 'Languages (comma separated)', name: 'language' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}

          {[
            { label: 'Experience (Years)', name: 'experience' },
            { label: 'Fee (₹)', name: 'fee' },
            { label: 'Cashback (₹)', name: 'cashback' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="number"
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium">Facility</label>
            <select name="facility" value={formData.facility} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="Apollo Hospital">Apollo Hospital</option>
              <option value="Other Clinics">Other Clinics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Mode of Consult</label>
            <select name="modeOfConsult" value={formData.modeOfConsult} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="Hospital">Hospital</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
