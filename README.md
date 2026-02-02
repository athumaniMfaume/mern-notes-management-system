# MERN Notes Management System

A full-stack **MERN (MongoDB, Express, React, Node.js)** application for managing personal or team notes. Users can create, read, update, and delete notes with a clean and responsive interface. The backend supports rate-limiting for API requests using **Upstash Redis**.

**Live Demo:** [https://mern-notes-management-system.onrender.com/](https://mern-notes-management-system.onrender.com/)

---

## Features

- User-friendly interface for managing notes
- Create, read, update, and delete notes (CRUD)
- API endpoints for notes management
- Rate limiting to prevent API abuse
- MongoDB database for persistent storage
- React frontend with Vite for fast builds
- Fully deployed on Render

---

## Technologies Used

- **Frontend:** React, Vite, TailwindCSS, DaisyUI
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication & Security:** Environment variables, Rate limiting with Upstash Redis
- **Deployment:** Render

---

## Installation (Local Development)

1. **Clone the repository**

```bash
git clone https://github.com/athumaniMfaume/mern-notes-management-system.git
cd mern-notes-management-system
Install backend dependencies

bash
Copy code
cd backend
npm install
Install frontend dependencies

bash
Copy code
cd ../frontend
npm install
Setup environment variables

Create a .env file in the backend folder:

env
Copy code
MONGO_URI=your_mongodb_uri
PORT=5001
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=development
Run the app

Start backend (API server):

bash
Copy code
cd ../backend
npm run dev
Start frontend (React dev server):

bash
Copy code
cd ../frontend
npm run dev
The app should now be running locally at http://localhost:5173.

API Endpoints
Method	Endpoint	Description
GET	/api/notes	Get all notes
GET	/api/notes/:id	Get a single note
POST	/api/notes	Create a new note
PUT	/api/notes/:id	Update an existing note
DELETE	/api/notes/:id	Delete a note

All API endpoints are rate-limited to prevent abuse.

Deployment
This project is deployed on Render. You can access the live app here:

https://mern-notes-management-system.onrender.com/


License
MIT License

Author
Athumani Mfaume
Email: athuamanimfaume1995@gmail.com
portfolio: https://athumanimfaume.netlify.app/









