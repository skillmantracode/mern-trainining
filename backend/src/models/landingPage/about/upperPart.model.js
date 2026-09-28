import mongoose from "mongoose";

const upperPartSchema=new mongoose.Schema({
    badgeText:{
      type:String,
      required:true
    },
     schoolName:{
      type:String,
      required:true
    },
     location:{
      type:String,
      required:true
    },
     schoolCode:{
      type:String,
      required:true
    },
     affiliation:{
      type:String,
      required:true
    },
     estYear:{
      type:String,
      required:true
    },
     overviewText:{
      type:String,
      required:true
    },
})

const upperAboutModel=mongoose.model("UpperAbout",upperPartSchema)
export default upperAboutModel