const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('node:path');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const contentRoutes = require('./routes/contentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const rootDir = path.resolve(__dirname, '..');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(rootDir, process.env.UPLOAD_DIR || 'uploads')));
app.use('/item_pics', express.static(path.join(rootDir, process.env.ITEM_UPLOAD_DIR || 'item_pics')));
app.use('/profile_pics', express.static(path.join(rootDir, process.env.PROFILE_UPLOAD_DIR || 'profile_pics')));
app.use('/images', express.static(path.join(rootDir, 'images')));
app.use('/fonts', express.static(path.join(rootDir, 'fonts')));
app.use('/hf', express.static(path.join(rootDir, 'hf')));
app.get('/style.css', (_req, res) => res.sendFile(path.join(rootDir, 'style.css')));
app.use(express.static(path.join(rootDir, 'public')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/openapi.yaml', (_req, res) => res.sendFile(path.join(rootDir, 'openapi.yaml')));
app.get('/docs', (_req, res) => res.sendFile(path.join(rootDir, 'public', 'docs.html')));
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api', contentRoutes);
app.use('/api/profile', profileRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
