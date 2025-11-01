import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongoose connected")
    }).catch((err)=>{
        console.log(err)
    })
}

export default connectDB