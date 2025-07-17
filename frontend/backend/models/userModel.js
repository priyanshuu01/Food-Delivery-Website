import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin: { type: Boolean, default: false }, // Add admin field
    cartDate:{type:Object,default:{}}

},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;