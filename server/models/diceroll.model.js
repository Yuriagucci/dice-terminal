import mongoose from 'mongoose';

const dicerollSchema = new mongoose.Schema({
    diceinput: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    rolledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // references the users collection
        required: true,
    }
}, {
    timestamps: true,
});


const Diceroll = mongoose.model('Diceroll', dicerollSchema);
export default Diceroll;