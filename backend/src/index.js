const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./services/db_service');
const logger = require('./services/logger_service');
const authRoutes = require('./routes/authRoutes')

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));