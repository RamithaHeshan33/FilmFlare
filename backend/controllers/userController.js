const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// get all users
const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        if(!users || users.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
};

exports.getAllUsers = getAllUsers;

// get user by id
const getUserByID = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findById(id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.getUserByID = getUserByID;

// register user
const registerUser = async(req, res) => {
    try {
        const {username, email, password, name, phone} = req.body;
        if(!username || !email || !password || !name || !phone) {
            return res.status(400).json({message: "Please fill all fields"});
        }

        const existingUser = await userModel.findOne({email, username});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            name,
            phone
        });

        await newUser.save();
        return res.status(201).json({message: "User registered successfully", user: newUser});
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.registerUser = registerUser;

// login user
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Please fill all fields"});
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({message: "Invalid Credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }

        return res.status(200).json({message: "Login successful", user});
    }

    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.loginUser = loginUser;

// delete user
const deleteUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User deleted successfully"});
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.deleteUser = deleteUser;

// update user
const updateUser = async(req, res) => {
    const {id} = req.params;
    try {
        const {username, email, password, name, phone} = req.body;
        if(!username || !email || !password || !name || !phone) {
            return res.status(400).json({message: "Please fill all fields"});
        }

        const existingUser = await userModel.findOne({
            email,
            username,
            _id: {$ne: id}
        });
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await userModel.findByIdAndUpdate(id, {
            username,
            email,
            password: hashedPassword,
            name,
            phone
        }, {new: true});

        if(!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json({message: "User updated successfully", user: updatedUser});
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.updateUser = updateUser;
