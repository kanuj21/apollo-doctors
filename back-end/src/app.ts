// backend/src/app.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import doctorRoutes from './routes/doctor.route';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // frontend port
  credentials: true,
}));
app.use(express.json()); // parsing application/json
app.use(express.urlencoded({ extended: true })); //form submissions
app.use(morgan('dev')); // Logs HTTP requests

// Routes
app.use('/api/doctors', doctorRoutes);

// Check Route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

export default app;
