import mongoose from 'mongoose'
import config from './config.js'
export const  connectDB= async ()=>{
  try {
    const connect= await mongoose.connect(config.MONGODB_URL)
    console.log("MongoDb connected successfully");
   
    
    
  }
  catch(err){
    console.log(err.message);
    process.exit(1)
  }
}