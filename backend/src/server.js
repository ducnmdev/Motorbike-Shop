require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const route = require('./routes');
const db = require('./config/dbConnection');
const cookieParser = require("cookie-parser");

// Connect to DB
db();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({
   extended: true
}));
app.use(cors({
   origin: 'https://kusz.vercel.app/',
   credentials: true, // cho phép gửi cookie
}));
app.use(cookieParser());
app.use(express.json()); // middleware xử lý body là json

// HTTP logger
// app.use(morgan('combined'));

// Routes init
route(app);

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`));