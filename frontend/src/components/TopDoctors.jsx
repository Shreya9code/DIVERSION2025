import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctors) setLoading(false);
  }, [doctors]);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {loading ? (
        <p className="text-lg text-gray-600">Loading doctors...</p>
      ) : doctors && doctors.length > 0 ? (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {doctors.slice(0, 10).map((item, index) => (
            <div
              key={item._id || index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                className="bg-blue-50 object-cover w-full h-40"
                src={item.image || "/default-doctor.png"}
                alt={item.name || "Doctor"}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600">No doctors available.</p>
      )}

      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:bg-blue-100 transition-all"
      >
        More..
      </button>
    </div>
  );
};

export default TopDoctors;
