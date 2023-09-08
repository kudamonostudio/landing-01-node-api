import mongoose from 'mongoose';
import 'dotenv/config'
import { MONGODB_URI } from './environment.js';

export async function connectToDB() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB connection success`);
    } catch (error) {
        console.log(error);
    }
    
} 

