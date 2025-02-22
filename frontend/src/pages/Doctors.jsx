import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  console.log("Selected Speciality:", speciality);

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const specializations = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.specialization === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="p-4">
      <h2 className="text-gray-600 text-lg font-semibold">
        Browse through the Doctors Specialist
      </h2>

      {/* Filter Button (for mobile) */}
      <button
        className={`py-2 px-4 border rounded text-sm transition-all sm:hidden ${
          showFilter ? "bg-teal-400 text-white" : "bg-gray-100"
        }`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`flex flex-col sm:flex-row gap-6 mt-4 ${showFilter ? "flex" : "hidden sm:flex"}`}>
        {/* Sidebar Filter */}
        <div className="flex flex-col gap-3 text-gray-600">
          {specializations.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec ? navigate("/doctors") : navigate(`/doctors/${spec}`)
              }
              className={`w-full sm:w-auto pl-4 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${
                speciality === spec ? "bg-indigo-100 text-black font-semibold" : "hover:bg-gray-200"
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm"
              >
                <img
                  className="w-full h-48 object-cover bg-blue-50"
                  src={item.image || "/default-doctor.jpg"}
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-teal-500">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.specialization}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No doctors available for this specialization.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
