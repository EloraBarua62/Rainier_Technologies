const app = require('./app');
const {dbConnect} = require('./utils/dbConnect');

require('dotenv').config();
dbConnect();

const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log("server is running");
})