const express = require('express');
const connectDB = require('./services/db_service');
const dotenv = require('dotenv');
const logger = require('./services/logger_service');

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));