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

// get movie by id
const getMovieByID = async(req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);
        if(!movie || movie.length === 0) {
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json(movie);
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.getMovieByID = getMovieByID;

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

// update movie
const updateMovie = async(req, res) => {
    try {
        const {title, description, director, year, image} = req.body;
        if(!title || !description || !director || !year || !image) {
            return res.status(400).json({message: "All fields are required"});
        }
        const movie = await movieModel.findByIdAndUpdate(req.params.id, {
            title,
            description,
            director,
            year,
            image
        }, {new: true});
        if(!movie) {
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json(movie);
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.updateMovie = updateMovie;

// delete movie
const deleteMovie = async(req, res) => {
    try {
        const movie = await movieModel.findByIdAndDelete(req.params.id);
        if(!movie || movie.length === 0) {
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json({message: "Movie deleted successfully"});
    }

    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.deleteMovie = deleteMovie;

