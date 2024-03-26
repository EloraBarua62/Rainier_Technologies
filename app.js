const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/user.route');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// User account route
app.get('/', (req, res) => {
    res.send("Server is running");
});

app.use('/api/user', userRoute);

module.exports = app;

