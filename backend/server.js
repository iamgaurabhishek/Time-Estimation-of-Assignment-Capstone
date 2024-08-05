const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('api/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// // creating middlewares

// app.use(bodyParser.json());
// app.use(cors());

// // connecting to MongoDB
// mongoose.connect('mongodb://localhost', {useNewUrlParser: true, useUnifiedTopology: true});
// // in the above line we need a mongoDB connection string to connect
// // Routes

// //The following lines need to be filled with the path to their respective routes
// const userRoutes = require()
// const questionRoutes = require();

// const port = 5000;
// app.listen(port, ()=> console.log(`Server running on port ${port}`));