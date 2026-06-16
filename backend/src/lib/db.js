import mongoose from "mongoose";


export const connectDB=async ()=>{
    try {
    const con=   await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to MongDB ${con.connection.host}`);
    } catch (error) {
        console.log('error while connecting in the database');
    }
}