import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/context";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const {docId}=useParams();
  const {doctors, currencySymbol, getDoctorData, uToken, backend_url, userData}=useContext(AppContext);
  const [docInfo, setDocInfo]=useState(null);
  const [docSlots, setDocSlots]=useState([]);
  const [slotIndex, setSlotIndex]=useState(0);
  const [slotTime, setSlotTime]=useState('');
  const navigate=useNavigate();

  const daysOfWeek=['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchDocInfo=async ()=> {
    const doctorInfo=doctors.find(doc=> doc._id===docId);
    setDocInfo(doctorInfo);
  }

  const getAvailableSlots=async ()=> {
    setDocSlots([]);

    let today=new Date();

    for(let i=0;i<7;i++){
      let currDate=new Date(today);
      currDate.setDate(today.getDate()+i);

      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(22, 0, 0, 0);

      if(today.getDate()===currDate.getDate()){
        currDate.setHours(currDate.getHours()>10 ? currDate.getHours()+1 : 10);
        currDate.setMinutes(currDate.getMinutes()>30 ? 30 : 0);
      }else{
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots=[];

      while(currDate<endTime){
        let formattedDate=currDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        let day=currDate.getDate();
        let month=currDate.getMonth()+1;
        let year=currDate.getFullYear();

        const slotDate=`${day}-${month}-${year}`;
        const slotTime=formattedDate

        const isSlotBooked=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
        if(isSlotBooked){
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedDate
          });
        }

        currDate.setMinutes(currDate.getMinutes()+30);
      }

      setDocSlots(prev=> ([...prev, timeSlots]));
    }
  }

  const bookAppointment=async ()=> {
    if(!uToken){
      toast.warn("Login to book appointment!");
      navigate("/login");
      return;
    }

    try{
      const date=docSlots[slotIndex][0].datetime;

      let day=date.getDate();
      let month=date.getMonth()+1;
      let year=date.getFullYear();

      const slotDate=`${day}-${month}-${year}`;

      const {data}=await axios.post(`${backend_url}/hms/user/bookAppointment`, {docId, slotDate, slotTime}, {
        headers: {
          uToken
        }
      });
      console.log(data);

      if(data.success){
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.response?.data?.message || "Something went wrong, please try again later!");
    }
  }

  useEffect(()=> {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(()=> {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(()=> {
    console.log(docSlots);
  }, [docSlots]);

  return (
    <div>
      {/* Doctor's details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-65 h-70 sm:max-w-72 rounded-lg" src={docInfo?.image} alt="doc"/>
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{docInfo?.name} <img className="w-5" src={assets.verified_icon} alt="icon"/></p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo?.degree} - {docInfo?.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo?.experience}</button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="icon"/></p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo?.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className="text-gray-700">{currencySymbol}{docInfo?.fees}</span></p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((slot, idx)=> (
              <div onClick={()=> setSlotIndex(idx)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===idx ? 'bg-primary text-white' : 'border border-gray-200'}`} key={idx}>
                <p>{slot[0] && daysOfWeek[slot[0].datetime.getDay()]}</p>
                <p>{slot[0] && slot[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots[slotIndex].map((item, idx)=> (
              <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={idx}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer">Book the Appointment</button>
      </div>

      {/* Listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality}/>
    </div>
  )
}

export default Appointment;
