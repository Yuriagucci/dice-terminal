import express from 'express';
import dotenv from "dotenv"; 
import { connectDB } from './config/db.js'; 
import usersRoutes from './routes/users.route.js'; // Import the users routes
import dicerollRoutes from './routes/diceroll.route.js'; // Import the users routes


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/users", usersRoutes)
app.use("/api/dice", dicerollRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ' + PORT);
});


//pass: qcRhKLHM0xIwNmeu
