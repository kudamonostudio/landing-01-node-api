import mongoose from 'mongoose';
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDB() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB connection success`);
    } catch (error) {
        console.log(error);
    }
    
} 

