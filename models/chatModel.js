import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName: {
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

const chatModel = mongoose.models.chat || mongoose.model('chat',chatSchema);
export default chatModel