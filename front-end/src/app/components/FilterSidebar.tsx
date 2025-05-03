"use client";

import { useState } from "react";
type Props = {
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};


export default function FilterSidebar({ selectedFilters, setSelectedFilters }: Props) {
  const [experienceExpanded, setExperienceExpanded] = useState(false);

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const clearAll = () => {
    setSelectedFilters([]);
    setExperienceExpanded(false);
  };

  const filterOption = (label: string, value: string) => (
    <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
      <input
        type="checkbox"
        checked={selectedFilters.includes(value)}
        onChange={() => toggleFilter(value)}
        className="accent-blue-600"
      />
      {label}
    </label>
  );

  return (
    <aside className="w-[250px] h-screen sticky top-0 border-r border-gray-300 p-4 overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filter</h2>
        <button
          onClick={clearAll}
          className="text-sm text-[#02475b] hover:underline"
        >
          Clear All
        </button>
      </div>

      <button className="w-full mb-6 text-sm border border-gray-400 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
        Show Doctors Near Me
      </button>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Mode of Consult</h3>
        <div className="flex flex-col gap-2">
          {filterOption("Hospital Visit", "hospital")}
          {filterOption("Online Consult", "online")}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Experience (In Years)</h3>
        <div className="flex flex-col gap-2">
          {filterOption("0-5", "exp-0-5")}
          {filterOption("6-10", "exp-6-10")}
          {filterOption("11-16", "exp-11-16")}
          {experienceExpanded && filterOption("16+", "exp-16+")}
        </div>
        <button
          onClick={() => setExperienceExpanded(!experienceExpanded)}
          className="text-xs text-blue-600 mt-1 hover:underline"
        >
          {experienceExpanded ? "See Less" : "+1 More"}
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Fees (In Rupees)</h3>
        <div className="flex flex-col gap-2">
          {filterOption("100-500", "fee-100-500")}
          {filterOption("500-1000", "fee-500-1000")}
          {filterOption("1000+", "fee-1000+")}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Language</h3>
        <div className="flex flex-col gap-2">
          {filterOption("English", "lang-en")}
          {filterOption("Hindi", "lang-hi")}
          {filterOption("Telugu", "lang-te")}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-sm mb-2">Facility</h3>
        <div className="flex flex-col gap-2">
          {filterOption("Apollo Hospital", "apollo")}
          {filterOption("Other Clinics", "other")}
        </div>
      </div>
    </aside>
  );
}
