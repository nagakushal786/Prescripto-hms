import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/context";

const Doctors = () => {
  const {speciality}=useParams();
  const {doctors}=useContext(AppContext);
  const [filterDoc, setFilterDoc]=useState([]);
  const navigate=useNavigate();
  const [showFilter, setShowFilter]=useState(false);

  const applyFilter=()=> {
    if(speciality){
      setFilterDoc(doctors.filter(doc=> doc.speciality===speciality));
    }else{
      setFilterDoc(doctors);
    }
  }

  useEffect(()=> {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors you want.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'text-white bg-[#5f6FFF]' : ''}`} onClick={()=> setShowFilter(prev=> !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality==='General Physician' ? navigate("/doctors") : navigate("/doctors/General Physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General Physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
          <p onClick={()=> speciality==='Gynaecologist' ? navigate("/doctors") : navigate("/doctors/Gynaecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynaecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynaecologist</p>
          <p onClick={()=> speciality==='Dermatologist' ? navigate("/doctors") : navigate("/doctors/Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality==='Pediatrician' ? navigate("/doctors") : navigate("/doctors/Pediatrician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatrician" ? "bg-indigo-100 text-black" : ""}`}>Pediatrician</p>
          <p onClick={()=> speciality==='Neurologist' ? navigate("/doctors") : navigate("/doctors/Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={()=> speciality==='Gastroenterologist' ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {
            filterDoc.map((doc, idx)=> (
              <div onClick={()=> navigate(`/appointment/${doc._id}`)} key={idx} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                  <img className="bg-blue-50 w-90 h-70" src={doc.image} alt="doc"/>
                  <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-center text-green-500">
                        <p className={`w-2 h-2 ${doc.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p><p className={`${doc.available ? 'text-green-500' : 'text-red-500'}`}>{doc.available ? 'Available' : 'Not Available'}</p>
                      </div>
                      <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
                      <p className="text-gray-600 text-sm">{doc.speciality}</p>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors;