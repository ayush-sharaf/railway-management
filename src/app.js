const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api', bookingRoutes);

module.exports = app;
