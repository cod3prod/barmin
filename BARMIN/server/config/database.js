import mongoose from 'mongoose';
import { DB_URL } from './config.js';

const connectDB = () => {
    mongoose.connect(DB_URL)
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.log('MongoDB connection error:', err));
}

export default connectDB
