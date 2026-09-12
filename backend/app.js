require('dotenv').config();
const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const videorouter = require("./router/video.router")

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/video', videorouter)

module.exports = app;