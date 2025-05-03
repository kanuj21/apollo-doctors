// src/app/components/DoctorCard.tsx

import { FaRupeeSign } from "react-icons/fa";
import Image from "next/image";
import { Doctor } from "../types/doctor";

type DoctorCardProps = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="w-[780px] h-[160px] border border-gray-300 rounded-md p-4 flex gap-6 shadow-sm bg-white">
      {/* Profile Image */}
      <div className="w-[75px] h-[80px]">
        
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse" />
        {/* <Image
          src={doctor.imageUrl || "/doctor-placeholder.jpg"}
          alt={doctor.name}
          width={75}
          height={80}
          className="rounded-md object-cover"
        /> */}
      </div>

      {/* Description Section */}
      <div className="w-[314px] h-[120px] flex flex-col justify-between">
        <h2 className="text-base font-bold">{doctor.name}</h2>
        <p className="text-sm text-gray-700">{doctor.speciality}</p>
        <p className="text-sm font-bold text-[#6b45c6]">
          {doctor.experience} years experience | {doctor.degree}
        </p>
        <p className="text-sm text-gray-600">{doctor.location}</p>
        <p className="text-sm text-gray-500">{doctor.clinicAddress}</p>
      </div>

      {/* Fees and Action Section */}
      <div className="w-[314px] h-[120px] flex flex-col justify-between items-center">
        <div className="text-sm mt-10 text-gray-700 font-medium justify-center items-baseline">
          <span className="inline-flex items-center font-bold">
            <FaRupeeSign className="mr-1" />
            <h1>{doctor.fee}</h1>
          </span>
          {" | "}
          <span className="text-green-600">{doctor.cashback} cashback</span>
        </div>

        <button className="w-full h-[45px] border border-blue-600 text-blue-600 rounded-md text-sm flex flex-col justify-center items-center hover:bg-blue-50">
          <span>Consult {doctor.modeOfConsult}</span>
          <span className="text-green-600 text-xs font-medium">Available</span>
        </button>
      </div>
    </div>
  );
}
