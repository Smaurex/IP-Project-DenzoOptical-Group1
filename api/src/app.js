require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const pool = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const itemsRoutes = require('./routes/items.routes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.json({
      success: true,
      data: {
        status: 'ok',
        db: 'connected'
      }
    });
  } catch (error) {
    console.error('Health check database query failed:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Database connection failed'
      }
    });
  }
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
