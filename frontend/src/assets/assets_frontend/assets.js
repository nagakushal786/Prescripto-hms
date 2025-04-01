import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General Physician',
        image: General_physician
    },
    {
        speciality: 'Gynaecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatrician',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

// export const doctors = [
//     {
//         _id: 'doc1',
//         name: 'Dr. Richard James',
//         image: doc1,
//         speciality: 'General Physician',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '17th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc2',
//         name: 'Dr. Emily Larson',
//         image: doc2,
//         speciality: 'Gynaecologist',
//         degree: 'MBBS',
//         experience: '3 Years',
//         about: 'Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 60,
//         address: {
//             line1: '27th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc3',
//         name: 'Dr. Sarah Patel',
//         image: doc3,
//         speciality: 'Dermatologist',
//         degree: 'MBBS',
//         experience: '1 Years',
//         about: 'Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 30,
//         address: {
//             line1: '37th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc4',
//         name: 'Dr. Christopher Lee',
//         image: doc4,
//         speciality: 'Pediatrician',
//         degree: 'MBBS',
//         experience: '2 Years',
//         about: 'Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 40,
//         address: {
//             line1: '47th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc5',
//         name: 'Dr. Jennifer Garcia',
//         image: doc5,
//         speciality: 'Neurologist',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '57th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc6',
//         name: 'Dr. Andrew Williams',
//         image: doc6,
//         speciality: 'Neurologist',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '57th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc7',
//         name: 'Dr. Christopher Davis',
//         image: doc7,
//         speciality: 'General Physician',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '17th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc8',
//         name: 'Dr. Timothy White',
//         image: doc8,
//         speciality: 'Gynaecologist',
//         degree: 'MBBS',
//         experience: '3 Years',
//         about: 'Dr. Timothy White has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 60,
//         address: {
//             line1: '27th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc9',
//         name: 'Dr. Ava Mitchell',
//         image: doc9,
//         speciality: 'Dermatologist',
//         degree: 'MBBS',
//         experience: '1 Years',
//         about: 'Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 30,
//         address: {
//             line1: '37th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc10',
//         name: 'Dr. Jeffrey King',
//         image: doc10,
//         speciality: 'Pediatrician',
//         degree: 'MBBS',
//         experience: '2 Years',
//         about: 'Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 40,
//         address: {
//             line1: '47th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc11',
//         name: 'Dr. Zoe Kelly',
//         image: doc11,
//         speciality: 'Neurologist',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '57th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc12',
//         name: 'Dr. Patrick Harris',
//         image: doc12,
//         speciality: 'Gastroenterologist',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '57th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc13',
//         name: 'Dr. Chloe Evans',
//         image: doc13,
//         speciality: 'General Physician',
//         degree: 'MBBS',
//         experience: '4 Years',
//         about: 'Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 50,
//         address: {
//             line1: '17th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc14',
//         name: 'Dr. Ryan Martinez',
//         image: doc14,
//         speciality: 'Gynaecologist',
//         degree: 'MBBS',
//         experience: '3 Years',
//         about: 'Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 60,
//         address: {
//             line1: '27th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
//     {
//         _id: 'doc15',
//         name: 'Dr. Amelia Hill',
//         image: doc15,
//         speciality: 'Dermatologist',
//         degree: 'MBBS',
//         experience: '1 Years',
//         about: 'Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
//         fees: 30,
//         address: {
//             line1: '37th Cross, Richmond',
//             line2: 'Circle, Ring Road, London'
//         }
//     },
// ]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Naresh Trehan',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS, MS (USA)',
        experience: '40+ Years',
        about: 'Chairman of Medanta - The Medicity. Pioneer in cardiovascular surgery with 40,000+ surgeries. Padma Shri and Padma Bhushan awardee. Specializes in beating heart coronary artery bypass.',
        fees: 150,
        address: {
            line1: 'Medanta Hospital',
            line2: 'Sector 38, Gurugram, Haryana'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Suresh H. Advani',
        image: doc2,
        speciality: 'Gynaecologist',
        degree: 'MD, PhD',
        experience: '45+ Years',
        about: 'Padma Bhushan awardee. Father of Indian medical oncology. Pioneered bone marrow transplantation in India. Specializes in leukemia treatment.',
        fees: 120,
        address: {
            line1: 'HN Reliance Hospital',
            line2: 'Girgaon, Mumbai'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Devi Shetty',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, FRCS',
        experience: '35+ Years',
        about: 'Founder of Narayana Health. Performed 15,000+ cardiac surgeries. Pioneer in affordable healthcare. Specializes in neonatal cardiac surgery.',
        fees: 100,
        address: {
            line1: 'Narayana Health City',
            line2: 'Bommasandra, Bangalore'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Mohan Thomas',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS, DSc (Hon)',
        experience: '30+ Years',
        about: "India's leading cosmetic surgeon. Pioneer of laser liposuction. Founder of Cosmetic Surgery Institute. Specializes in body contouring.",
        fees: 200,
        address: {
            line1: 'Breach Candy Hospital',
            line2: 'Cumballa Hill, Mumbai'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Randeep Guleria',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MD, DM (Pulm Med)',
        experience: '30+ Years',
        about: 'Former AIIMS Director. COVID-19 task force leader. Expert in sleep medicine & respiratory critical care. Padma Bhushan recipient.',
        fees: 110,
        address: {
            line1: 'Indraprastha Apollo',
            line2: 'Sarita Vihar, Delhi'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Y.K. Gupta',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS, MCh',
        experience: '25+ Years',
        about: 'Director of Neurosciences at Fortis. Expert in brain tumor surgery and spinal disorders. Performed 10,000+ neurosurgeries.',
        fees: 180,
        address: {
            line1: 'Fortis Escorts',
            line2: 'Okhla Road, Delhi'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Sandeep Vaishya',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS, MCh',
        experience: '20+ Years',
        about: 'Leading expert in minimally invasive spine surgery. Director of Fortis Memorial Institute. Specializes in disc replacement surgery.',
        fees: 130,
        address: {
            line1: 'Fortis Memorial',
            line2: 'Gurugram, Haryana'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. M.C. Mishra',
        image: doc8,
        speciality: 'Gynaecologist',
        degree: 'MBBS, FRCS',
        experience: '35+ Years',
        about: 'Former AIIMS Director. Pioneer in laparoscopic surgery. Expert in hepatobiliary and pancreatic surgery.',
        fees: 140,
        address: {
            line1: 'AIIMS Hospital',
            line2: 'Ansari Nagar, Delhi'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Shiv Kumar Sarin',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MD, DM (Gastro)',
        experience: '40+ Years',
        about: "Padma Bhushan awardee. Director of ILBS. World-renowned liver disease specialist. Developed India's first liver ICU.",
        fees: 160,
        address: {
            line1: 'ILBS Hospital',
            line2: 'Vasant Kunj, Delhi'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Ashok Seth',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS, FRCP',
        experience: '35+ Years',
        about: 'Chairman of Fortis Escorts. Performed 50,000+ angiograms. Padma Bhushan awardee. Pioneer in angioplasty techniques.',
        fees: 170,
        address: {
            line1: 'Fortis Escorts Heart',
            line2: 'Okhla Road, Delhi'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Prathap C. Reddy',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, MD',
        experience: '50+ Years',
        about: 'Founder of Apollo Hospitals. Revolutionized corporate healthcare in India. Padma Vibhushan recipient. Cardiology specialist.',
        fees: 200,
        address: {
            line1: 'Apollo Hospitals',
            line2: 'Greams Road, Chennai'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. A. Marthanda Pillai',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MCh',
        experience: '40+ Years',
        about: 'Former WHO advisor. Expert in pediatric neurosurgery. Performed 20,000+ brain surgeries. Developed epilepsy surgery program.',
        fees: 150,
        address: {
            line1: 'Sree Chitra Tirunal Inst',
            line2: 'Thiruvananthapuram'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Ramakanta Panda',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS, MS',
        experience: '30+ Years',
        about: "VC of Asian Heart Institute. Performed PM Modi's heart surgery. Record 99.6% bypass surgery success rate.",
        fees: 190,
        address: {
            line1: 'Asian Heart Institute',
            line2: 'Bandra Kurla Complex, Mumbai'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Harsh Mahajan',
        image: doc14,
        speciality: 'Gynaecologist',
        degree: 'MBBS, MD',
        experience: '35+ Years',
        about: 'Founder of Mahajan Imaging. Pioneer in digital mammography. Developed teleradiology network across India.',
        fees: 110,
        address: {
            line1: 'Mahajan Imaging',
            line2: 'DLF Phase V, Gurugram'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Shashi Wadhwa',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD',
        experience: '40+ Years',
        about: 'Former AIIMS HOD. Expert in neonatal care. Developed national immunization guidelines. Padma Shri recipient.',
        fees: 90,
        address: {
            line1: 'AIIMS Hospital',
            line2: 'Ansari Nagar, Delhi'
        }
    },
]