import mongoose from 'mongoose'

const connectDB= async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL,{})
        console.log(`The database is connected on ${conn.connection.host}`)  
    } catch (error) {
        console.log(error.message)
    }
   
    
}

export default connectDB