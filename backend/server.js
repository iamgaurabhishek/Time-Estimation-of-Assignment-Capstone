const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors()); 
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('api/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));