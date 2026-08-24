const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const expenseRoutes = require('./routes/expenseRoutes');

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