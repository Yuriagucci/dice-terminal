import Diceroll from '../models/diceroll.model.js'; // Ensure correct path
import mongoose from 'mongoose';

export const rollDice = async (req, res) => {
    // Destructure `rolledBy` (camelCase) to match schema and input
    const { diceinput, result, rolledBy } = req.body;

    // Validate incoming data
    if (!diceinput || !result || !rolledBy) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: diceInput, result, and rolledBy are all necessary."
        });
    }

    try {
        // Create a new Diceroll instance with the provided data
        const newDiceroll = new Diceroll({
            diceinput: diceinput,
            result: result,
            // Use `rolledBy` (camelCase) to match the schema
            rolledBy: rolledBy, // Corrected from `rolledby`
        });

        // Save the dice roll to the database
        await newDiceroll.save();

        // Send a successful response
        res.status(201).json({
            success: true,
            message: "Dice roll successfully recorded!",
            roll: {
                _id: newDiceroll._id,
                diceinput: newDiceroll.diceinput,
                result: newDiceroll.result,
                // Ensure output reflects the schema's `rolledBy` (camelCase)
                rolledBy: newDiceroll.rolledBy, // Corrected from `rolledby`
                createdAt: newDiceroll.createdAt,
                updatedAt: newDiceroll.updatedAt,
            },
        });

    } catch (error) {
        console.error("Error saving dice roll to database:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error occurred while saving the dice roll."
        });
    }
};

export const getRollHistoryByUserId = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      const rolls = await Diceroll.find({ rolledBy: new mongoose.Types.ObjectId(id) })
        .sort({ createdAt: 1 }); // Newest first, remove if you prefer oldest first
  
      return res.status(200).json(rolls);
    } catch (error) {
      console.error('Error fetching roll history:', error);
      return res.status(500).json({ message: 'Server error fetching roll history' });
    }
};

export const deleteRollsByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const result = await Diceroll.deleteMany({ rolledBy: new mongoose.Types.ObjectId(id) });

        return res.status(200).json({
        message: `Deleted ${result.deletedCount} roll(s) for user ${id}`
        });
    } catch (error) {
        console.error('Error deleting roll history:', error);
        return res.status(500).json({ message: 'Server error deleting roll history' });
    }
};
  
  


