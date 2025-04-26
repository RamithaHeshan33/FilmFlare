const express = require('express');
const rateController = require('../controllers/rateController');
const router = express.Router();

router.get('/', rateController.getAllRates);
router.post('/', rateController.addrate);
router.get('/movies/:movieId', rateController.getRateByMovieID);
router.get('/user/:userId', rateController.getRateByUserID);
router.put('/user/:userId', rateController.updateRateByUserID);

module.exports = router;