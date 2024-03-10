// usersRoute.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        const user = await newUser.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const temp={
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id,
            }
            

            res.status(200).json(temp);
        } else {
            res.status(400).json({ message: "Login failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
