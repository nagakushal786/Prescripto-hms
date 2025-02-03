import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full max-w-[360px]" src={assets.contact_image} alt="contact"/>
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR HOSPITAL</p>
          <p className="text-gray-500">Room no 38B, MedConnect Hospital <br /> Budhwarpeta, Kurnool, Andhra Pradesh</p>
          <p className="text-gray-500">Tel: 08518-235550 <br /> Email: prescripto@gmail.com</p>
          <p className="font-semibold text-lg text-gray-600">CAREERS AT MEDCONNECT</p>
          <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis perferendis accusantium tempore aliquam, rerum magnam.</p>
          <button className="border border-black px-8 py-4 text-sm rounded-full cursor-pointer hover:text-white hover:bg-[#5f6FFF] hover:border-[#5f6FFF] transition-all duration-500">EXPLORE JOBS</button>
        </div>
      </div>
    </div>
  )
}

export default Contact;