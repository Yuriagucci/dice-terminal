import User from '../models/users.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        return res.status(409).json({ success: false, message: "Email already exists" });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser, message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log("Requested deletion of user ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    console.log("Requested update of user ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Check if email already exists in another user
    if (user.email) {
        const existingUser = await User.findOne({ email: user.email });
        // If found, only block if it's not the current user
        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(409).json({ success: false, message: "Email already exists for another user" });
        }
    }

    // Hash password if it's being updated
    if (user.password) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true, runValidators: true });
        if (!updatedUser)
            return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        // Assuming 'bcrypt' is properly imported and 'user.password' is hashed
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        // Include user._id in the response
        res.status(200).json({
            success: true,
            message: "Login successful",
            name: user.name,
            userId: user._id // ✨ Add this line to include the user's ID ✨
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

