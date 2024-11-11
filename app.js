const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

// Enable CORS with default settings (allows all origins)
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

// Optionally, customize CORS settings
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow only specific origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'] // Restrict to specific HTTP methods if needed
// }));
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/reviews', reviewsRoutes);

module.exports = app;
