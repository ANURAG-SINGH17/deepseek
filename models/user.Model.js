import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {type:String , required:true},
        email : {type:String , required:true},
        password:{type:String , select:false,required:true},
        image: {type:String , required:false}
    },
    {timestamps: true}
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;

