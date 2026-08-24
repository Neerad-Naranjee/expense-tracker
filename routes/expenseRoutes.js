const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();

        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching expenses",
            error: error.message
        });
    }
});

module.exports = router;