import mongoose from "mongoose";


const DBConnect = async (MONGODB_URI : string) =>{
    try {
        const DB_OPTIONS ={
            dbName: 'payment_integration', 
        }
        await mongoose.connect(MONGODB_URI, DB_OPTIONS)
        console.log('Database connection successful!');
    } catch (error) {
        console.error("errror");
    }
}

export default DBConnect;