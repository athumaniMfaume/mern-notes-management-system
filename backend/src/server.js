import express from 'express'
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';      
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'; 
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;


// middleware to parse JSON request bodies
app.use(express.json());
app.use(rateLimiter);
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
}));


// our simple logging and CORS middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} request for ${req.url}`);
//     res.setHeader('Access-Control-Allow-Origin', '*');  
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
   app.listen(PORT, ()=>{
    console.log('server is running on port:', PORT);
});
});


// mongodb credent XnxAgHAAXaVSvBfL
//mongodb+srv://athumanimfaume1995_db_user:XnxAgHAAXaVSvBfL@cluster0.cvzyjd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
