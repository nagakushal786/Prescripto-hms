import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const {doctors, aToken, getDoctors, changeAvailability}=useContext(AdminContext);

  useEffect(()=> {
    if(aToken){
      getDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='mb-3 text-2xl font-medium text-primary'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((doc, idx)=> (
            <div className='border border-indigo-200 rounded-xl max-w-70 overflow-hidden cursor-pointer group' key={idx}>
              <img src={doc.image} alt="doc" className='bg-indigo-50 group-hover:bg-[#5F6FFF] transition-all duration-500 w-90 h-70'/>
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{doc.name}</p>
                <p className='text-zinc-600 text-sm'>{doc.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(doc._id)} type="checkbox" checked={doc.available} className='cursor-pointer'/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList;