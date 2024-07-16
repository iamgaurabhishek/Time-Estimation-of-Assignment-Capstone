const express = require('express');
const mongoose = require('mongoose');
const bycrypt = require('bycrypt');
const jwt = require('jwt');
const cors = require('cors');

// here we have to add one more line related to the MongoDB connection string
const mongoURI = process.env.MONGODB_URI
//------------------------------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json());

// define the User schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true},
});

// hash the password before saving it to the database
userSchema.pre("save", async (next) => {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("User", userSchema);

// Registration route

app.post("/register", async (req, res) => {
  try {
    if(!username || !password || !email) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }
    const { username, password, email } = req.body;
    // check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB.
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

  const port = process.env.MONGODB_PORT || 3500;
  app.listen(port, () => console.log(`Server running on port ${port}`));