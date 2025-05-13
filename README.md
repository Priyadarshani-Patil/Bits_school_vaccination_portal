# 📘 School Vaccination Portal

A full-stack application to manage student vaccination data, vaccination drives, and reporting for schools. 
This system enables secure login, dashboard management, student and drive records handling, and CSV export/report generation.

## 📂 Table of Contents

- [System Overview](#system-overview)
- [Architecture](#architecture)
- Flow Diagram(#Flow Diagram)
- [Tech Stack](#tech-stack)
- [Frontend-Backend Interaction](#frontend-backend-interaction)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [UI Snapshots](#ui-snapshots)
- [API Response Snapshots](#api-response-snapshots)
- [Demo Video](#demo-video)

## 🧩 System Overview

The School Vaccination Portal helps school admins:
- Manage student vaccination data.
- Add/manage vaccination drives.
- Export vaccination reports.
- Track unvaccinated students.
- Login securely to access the dashboard.

## 🏗️ Architecture

```
React (Client) → Axios → Express.js (Server) → MongoDB
```

- React frontend calls Express APIs.
- Express manages routing, validation, and data operations.
- MongoDB stores students, drives, and admin data.

### Flow Diagram

| **User (Coordinator)**     | **React Frontend App**  | **Node.js + Express Backend** | **MongoDB Database** |
|----------------------------|--------------------------|--------------------------------|-----------------------|
| - Login                    | - Pages (Login, Dashboard) | - Routes (API Endpoints)     | - Students Collection |
| - Dashboard                | - Components (Students, Drives) | - Controllers (Business Logic) | - Drives Collection   |
| - Manage Students          | - Axios Services         | - Models (Mongoose schemas)   | - Vaccination Records |
| - Manage Drives            | - Routing (react-router-dom) | - Middlewares (Auth, Validation) |                       |
| - Generate Reports         |                          |                                |                       |
| **↓**                      | **↓**                    | **↓**                          | **↓**                 |
| (API Requests via Axios)   | (REST API Calls)         | (Database Queries)             |                       |


## 🛠️ Tech Stack

| Component       | Tech Stack        		  |
|-----------------|-------------------------|
| Frontend        | React, Axios, Bootstrap |
| Backend         | Node.js, Express 		    |
| Database        | MongoDB          		    |
| API Testing     | Postman          		    |
| Version Control | Git, GitHub    			    |

## 🔄 Frontend-Backend Interaction

- Frontend sends HTTP requests using Axios.
- Backend exposes RESTful APIs for authentication, student, and drive management.
- JSON is used as data exchange format.

## 📡 API Endpoints

### Authentication
| Method | Route                   | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/api/auth/login`       | Login admin              |

### Students
| Method | Route              	   | Description           |
|--------|-------------------------|-----------------------|
| GET    | `/api/students`         | Get all students      |
| POST   | `/api/students`         | Add a student         |
| PUT    | `/api/students/:id`     | Update student        |
| DELETE | `/api/students/:id`     | Delete student        |

### Drives
| Method | Route                   | Description           |
|--------|-------------------------|-----------------------|
| GET    | `/api/drives`           | Get all drives        |
| POST   | `/api/drives`           | Add a new drive       |
| PUT    | `/api/drives/:id`       | Update drive          |
| DELETE | `/api/drives/:id`       | Delete drive          |

## 🗃️ Database Schema

### Student Model
```json
{
  "name": "John Doe",
  "grade": "5",
  "vaccinated": true,
  "vaccineName": "Covaxin"
}
```

### Drive Model
```json
{
  "date": "2025-05-01",
  "location": "Auditorium",
  "targetGroup": "students" , 
  "vaccinationName": "Covishield"
  }
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB running locally 

### 🔧 Backend Setup
```bash
cd server
npm install
touch .env
# Add MONGO_URI and PORT
npm start
```

### 💻 Frontend Setup
```bash
cd client
npm install
npm start
```

## 🖼️ UI Snapshots

https://docs.google.com/document/d/12845qIm-16qEpDlgqU3UO1U8JjjSDm2-/edit?usp=drive_link&ouid=117207022995177950017&rtpof=true&sd=true

## 🎥 Demo Video

📺 https://drive.google.com/file/d/1n0SfwdKsHCUCOiojIiGK7n_yudmxoyUw/view?usp=drive_link

## 📁 GitHub Repository

🔗 [Bits_school_vaccination_portal](https://github.com/Priyadarshani-Patil/Bits_school_vaccination_portal)

