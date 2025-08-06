import express from 'express';
import { getUsers, createUser, deleteUser, updateUser, loginUser } from '../controllers/users.controller.js';

const router = express.Router();

//GET http://localhost:5000/api/users/get
//CREATE
// http://localhost:5000/api/users

//DELETE
//id http://localhost:5000/api/users/687dfd4dfdd2d72e18eb2f78
//PUT if update lahat
//PATCH if update certain fields only

//UPDATE
//id http://localhost:5000/api/users/687dfd4dfdd2d72e18eb2f78

//Hello

router.get("/get", getUsers); 
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.post("/login", loginUser);



console.log(process.env.MONGO_URI)
export default router;
