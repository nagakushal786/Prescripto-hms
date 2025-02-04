import { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData]=useState({
    name: "Naga Kushal Vankadara",
    image: assets.profile_pic,
    email: "kushal123@gmail.com",
    phone: "+91 9876543210",
    address: {
      line1: "Road no 57, King market",
      line2: "One town, Kurnool"
    },
    gender: "Male",
    dob: "2000-01-20"
  });

  const [isEdit, setIsEdit]=useState(false);

  return (
    <div>
      <img src={userData.image} alt="user"/>
    </div>
  )
}

export default MyProfile;