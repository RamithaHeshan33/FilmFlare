require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require("./routes/indexRoutes");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use("/", express.json());
app.use("/", router);

mongoose.connect(MONGO_URI)
.then(() => {console.log("Connected to MongoDB")})
.then(() => {app.listen(PORT);})
.catch((err) => {console.log(err);})