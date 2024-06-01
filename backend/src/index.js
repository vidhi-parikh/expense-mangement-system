const express = require('express');
const connectDB = require('./services/db_service');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));