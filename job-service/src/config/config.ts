import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const PORT = Number(process.env.PORT) || 8001;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI as string;    
    const client = await mongoose.connect(uri); 

    if (client) {
      console.log(`
        -----------------------------------
        -     JOb SRV MONGODB CONNECTED  - 
        -----------------------------------
      `);
    } else { 
      console.error("Failed to connect to MongoDB.");
      process.exit(1);
    }
  } catch (error) {
    console.error('Error connecting to MongoD:', error);
    process.exit(1);
  }
};
 