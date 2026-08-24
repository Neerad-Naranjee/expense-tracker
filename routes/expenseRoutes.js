const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

// GET all expenses, because theres no ID provided, we will fetch all expenses from the database.
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

// GET one expense by ID
router.get("/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json(expense);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching expense",
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

// PUT update an expense
router.put("/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({
            message: "Error updating expense",
            error: error.message
        });
    }
});

// DELETE an expense
router.delete("/:id", async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully",
            expense: deletedExpense
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting expense",
            error: error.message
        });
    }
});

module.exports = router;