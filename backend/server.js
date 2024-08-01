const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// creating middlewares

app.use(bodyParser.json());
app.use(cors());

// connecting to MongoDB
mongoose.connect('mongodb://localhost', {useNewUrlParser: true, useUnifiedTopology: true});
// in the above line we need a mongoDB connection string to connect
// Routes

//The following lines need to be filled with the path to their respective routes
const userRoutes = require()
const questionRoutes = require();

const port = 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));