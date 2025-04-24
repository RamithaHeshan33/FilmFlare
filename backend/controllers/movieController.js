const movieModel = require('../models/movieModel');

// get all movies
const getAllMovies = async(req, res) => {
    try {
        const movies = await movieModel.find();
        if(!movies || movies.length === 0) {
            return res.status(404).json({message: "No movies found"});
        }
        return res.status(200).json(movies);
    }

    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.getAllMovies = getAllMovies;

// add movie
const addMovie = async(req, res) => {
    try {
        const {title, description, director, year, image} = req.body;
        if(!title || !description || !director || !year || !image) {
            return res.status(400).json({message: "All fields are required"});
        }
        const movie = new movieModel({
            title,
            description,
            director,
            year,
            image
        });
        await movie.save();
        return res.status(201).json(movie);
    }

    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.addMovie = addMovie;

