import express from 'express';
import { rollDice, getRollHistoryByUserId, deleteRollsByUserId} from '../controllers/diceroll.controller.js'; // Adjust path as necessary

const router = express.Router();

// Define a POST route for rolling dice
router.post('/roll', rollDice); // Example route: /api/dicerolls/roll
router.get('/history/:id', getRollHistoryByUserId);
router.delete('/clear/:id', deleteRollsByUserId);

export default router;