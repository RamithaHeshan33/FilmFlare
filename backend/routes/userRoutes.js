const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserByID);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;