'use client';

import { useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import AddDoctorForm from './components/AddDoctorForm';
import FilterSidebar from "./components/FilterSidebar";
import DoctorList from "./components/DoctorList";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full min-h-screen box-border">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex pt-[110px] px-20 ">
        {/* Sticky Sidebar */}
        <div className="sticky top-[102px] h-[calc(110vh-12px)] shrink-0">
          <FilterSidebar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Doctor List or Other Content Goes Here */}
        <div className="flex-1 pl-6">
          <h1 className="text-xl font-semibold mt-4">Doctor Listings</h1>
          <DoctorList selectedFilters={selectedFilters} />
        </div>
        
        {/* Add Doctor button */}
        <div>
          <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-[#02475b] text-white rounded hover:bg-green-700"
            >
              + Add Doctor
            </button>
            {showForm && <AddDoctorForm onClose={() => setShowForm(false)} onSuccess={() => window.location.reload()} />}
        </div>
      </main>
    </div>
  );
}
