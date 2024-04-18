const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const hostname = '0.0.0.0';
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/mentor_student_db'; 

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Mount router
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});
