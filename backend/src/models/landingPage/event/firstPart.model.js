import mongoose from "mongoose";

const firstEventSchema=new mongoose.Schema({
   departmentTags:{
    type:String,
    required:true
   }
})
const firstEventModel=mongoose.model("FirstEvent",firstEventSchema)
export default firstEventModel