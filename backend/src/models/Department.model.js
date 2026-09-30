import mongoose from "mongoose";

const DepartmentSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   code:{
    type:String,
    required:true,
    uppercase:true, 
    trim:true,
    unique:true
   },
   description:{
    type:String,
    required:true
   },
   status:{
    type:Boolean,
    default:false
   },

})

const DepartmentModel=mongoose.model("Department",DepartmentSchema)
export default DepartmentModel