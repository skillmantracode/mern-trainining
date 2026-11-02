// models/AchievementSection.js
import mongoose from 'mongoose';

const statItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  iconName: { type: String, required: true },
  number: { type: String, required: true },
  label: { type: String, required: true },
  subtext: { type: String, required: true },
});

const achievementSectionSchema = new mongoose.Schema(
  {
    badge: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    stats: [statItemSchema],
  },
  { timestamps: true }
);

const AchievementSection = mongoose.model('AchievementSection', achievementSectionSchema);

export default AchievementSection;