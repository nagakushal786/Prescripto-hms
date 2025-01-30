import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/context";

const Appointment = () => {
  const {docId}=useParams();
  const {doctors}=useContext(AppContext);
  const [docInfo, setDocInfo]=useState(null);

  const fetchDocInfo=async ()=> {
    const doctorInfo=doctors.find(doc=> doc._id===docId);
    setDocInfo(doctorInfo);
  }

  useEffect(()=> {
    fetchDocInfo();
  }, [docInfo]);

  return (
    <div></div>
  )
}

export default Appointment;