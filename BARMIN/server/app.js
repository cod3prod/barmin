import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
