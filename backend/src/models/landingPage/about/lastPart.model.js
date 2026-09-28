import mongoose from "mongoose";

const card1Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});



const card2Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const card3Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const card4Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const lastAboutSchema = new mongoose.Schema({
  card1: [card1Schema],
  card2: [card2Schema],
  card3: [card3Schema],
  card4: [card4Schema],
});

const lastAboutModel = mongoose.model("LastAbout", lastAboutSchema);
export default lastAboutModel;
