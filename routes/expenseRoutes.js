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

router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);

        const savedExpense = await expense.save();

        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({
            message: "Error creating expense",
            error: error.message
        });
    }
});

module.exports = router;