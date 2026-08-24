const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');

const app = express();
const expenseRoutes = require('./routes/expenseRoutes');

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});