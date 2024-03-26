const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/user.route');
const courseRoute = require("./routes/course.route");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// User account route
app.get('/', (req, res) => {
    res.send("Server is running");
});

// Route: user login
app.use('/api/user', userRoute);

// Route: Course create
app.use('/api/course', courseRoute);

module.exports = app;

