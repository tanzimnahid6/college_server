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
app.use(cors());

// Optionally, customize CORS settings
// app.use(cors({
//   origin: 'https://your-frontend-domain.com', // Allow only specific origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict to specific HTTP methods if needed
// }));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/reviews', reviewsRoutes);

module.exports = app;
