// routes/achievementRoutes.js
import express from 'express';
import {
  getAchievements,
  createAchievements,
  updateAchievements,
} from '../controllers/achievement.js';

const router = express.Router();

router.route('/')
  .get(getAchievements)
  .post(createAchievements)
  .put(updateAchievements);

export default router;