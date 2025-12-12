import React from "react";
import { FaClock } from "react-icons/fa";

function Commingsoonmsg() {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto animate-fadeIn">

      {/* Icon */}
      <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full shadow-sm mb-4">
        <FaClock size={28} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-2">
        Listings Coming Soon
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm leading-relaxed">
        Our team is currently preparing business listings for this area.
        <br />
        Please stay tuned — <span className="font-semibold text-green-600">Kidvik.com</span>  
        will update this section very soon.
      </p>

    </div>
  );
}

export default Commingsoonmsg;
