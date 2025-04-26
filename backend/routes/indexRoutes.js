const express = require('express');
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const rateRoutes = require('./rateRoutes');

const router = express.Router();

// user routes
router.use('/users', userRoutes);

// rate routes
router.use('/rates', rateRoutes);

// movie routes
router.use('/movies', movieRoutes);

module.exports = router;
