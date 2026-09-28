import mongoose from "mongoose";

const syllabusSchema=new mongoose.Schema({
  syllabusTitle:{
    type:String,
    required:true
  },
   gradeLevel:{
    type:String,
    required:true
  },
   program:{
    type:String,
    required:true
  },
   topic:{
    type:String,
    required:true
  },
   syllabusDoc:{
    type:String,
    required:true
  },
})

const syllabusModel=mongoose.model("Syllabus",syllabusSchema)
export default syllabusModel