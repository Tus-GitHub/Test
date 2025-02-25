import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
},{timestamps:true})

export default mongoose.models.User || mongoose.model("User", UserSchema);