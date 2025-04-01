# Prescripto

Prescripto is a web-based application designed to streamline medical prescription management. The project consists of a frontend built with Vite and a backend that facilitates seamless communication between doctors and patients.

## Features

- **User Authentication**: Secure login and registration.
- **Appointent Booking**: Book appointment for logged in users and easy way of booking.
- **Prescription Management**: Create, update, and manage prescriptions digitally.
- **Doctor-Patient Interaction**: Patients can view prescriptions and communicate with doctors.
- **Admin Panel**: Dedicated panel for admin to manage appointments of patients and doctor information.
- **Doctor Panel**: Dedicated panel for doctor to manage his own appointments and update his information.
- **Responsive UI**: Modern and user-friendly interface.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (for frontend)
- npm (for package management)
- MongoDB (database used)



### Clone the Repository

```sh
git clone https://github.com/nagakushal786/Prescripto-hms.git
cd prescripto
```

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file) based on `example.env` and the file structure.
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Admin Panel Setup

1. Navigate to the adminPanel folder:
   ```sh
   cd adminPanel
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the adminPanel application:
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173/` in your browser.

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5174/` in your browser.



## Folder Structure

```
prescripto/
├── backend/               # Backend API
│   ├── controllers/       # Business logic
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── config/            # Configuration files - contains .env file
│   ├── middlewares/       # Middleware functions
│   ├── server.js          # Entry point
│   └── package.json       # Backend dependencies
|   ├── swaggerOptions.js  # Backend documentation entry point
│
├── frontend/              # Frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/ 
        ├── context
        ├── index.html
        ├── main.jsx
        ├── index.css
        ├── App.jsx
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
|
├── adminPanel/              # Admin Panel application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/ 
        ├── context/
        ├── index.html
        ├── main.jsx
        ├── index.css
        ├── App.jsx
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── README.md         # Project documentation
└── .gitignore
```



## Usage

- **Doctors**: Log in and manage the daily appointments of patients, view his earnings, no of appointments and no of patients. Also update his information.
- **Patients**: Log in and book appointments with particular doctor based on the specialization, view his appointments, update his information and pay the fees of doctor through online using razorpay gateway.
- **Admin**: Log in and manage the doctors schedule and patients appointments. He can even add a new doctor and update the availability of a particular doctor.



## Documentation Reference

- **Backend API Documentation**: [Swagger documentation for backend](https://localhost:4000/api-docs) - Make sure you access the documentation after running the backend of the project.
- **Frontend Documentation**: Refer to the `README.md` file for more details.



## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Make changes and commit them.
4. Push to your fork and submit a pull request.
5. Follow the code style and structure of the existing codebase.