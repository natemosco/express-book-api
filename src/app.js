const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const bookRoutes = require('./routes/books.routes');
const booksController = require('../src/controllers/books.controller');

const app = express();
const router = express.Router();

// parse body 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(cors());
app.use(morgan('dev'));
//custom middleware
app.use(logger);

// basic health check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// API routes
app.use('/api/books', bookRoutes);

// 404 unknown route handler
app.use((req,res,next) => {
    res.status(404).json({ message: 'Not Found' });
})

// global error handling middleware (last)
app.use(errorHandler);

module.exports = app;