require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const db = require('./db/index');

const restaurantRoute = require('./routes/restaurant');
const authRoute = require('./routes/auth');

const app = express();

app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", '*'),
        res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, OPTIONS'),
        res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization'),
        next();
});

app.use(bodyParser.json());

app.use('/api/v1', restaurantRoute);
app.use('/api/v1', authRoute);

app.use((error, req, res, next) => {
        console.log(error);
        const status = error.statuscode || 500;
        const message = error.message;
        res.status(status).json({ message: message });
});

const port = process.env.PORT || 3005;

app.listen(port, ()  => {
        logger.info(`server running on port: ${port}`)
});