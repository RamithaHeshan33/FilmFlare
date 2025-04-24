const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => {
    res.send("Hello World");
});

mongoose.connect("mongodb+srv://filmflare:CIUtgZbbZM6OpnZY@filmflare.smw9u4m.mongodb.net/")
.then(() => {console.log("Connected to MongoDB")})
.then(() => {app.listen(PORT);})
.catch((err) => {console.log(err);})