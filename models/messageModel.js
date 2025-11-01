import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    messages:[
        {
            role:{type:String , required:true},
            content:{type:String , required:true},
            timestamp:{type:Number, required:true}
        },
    ]
},{timestamps:true}
)

const messageModel = mongoose.models.message || mongoose.model('message',messageSchema);

export default messageModel