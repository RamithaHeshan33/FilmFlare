const rateModel = require("../models/rateModel");

// get all rates
const getAllRates = async (req, res) => {
    try {
        const rates = await rateModel.find();
        if (!rates || rates.length === 0) {
            return res.status(404).json({ message: "No rates found" });
        }
        return res.status(200).json(rates);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getAllRates = getAllRates;

// add rate
const addrate = async(req, res) => {
    try {
        const { movie, user, rate, comment } = req.body;

        if (!movie || !user || !rate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRate = new rateModel({
            movie: movie,
            user: user,
            rating: rate,
            comment
        });

        await newRate.save();
        return res.status(201).json(newRate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.addrate = addrate;

// get rate by movie id
const getRateByMovieID = async (req, res) => {
    try {
        const { movieId } = req.params;
        const rate = await rateModel.find({ movie: movieId });
        if (!rate || rate.length === 0) {
            return res.status(404).json({ message: "No rate found for this movie" });
        }
        return res.status(200).json(rate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getRateByMovieID = getRateByMovieID;

// get rate by user id
const getRateByUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const rate = await rateModel.find({ user: userId });
        if (!rate || rate.length === 0) {
            return res.status(404).json({ message: "No rates submitted by this user" });
        }
        return res.status(200).json(rate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getRateByUserID = getRateByUserID;
