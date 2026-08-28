import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ refresh, onExpenseChanged }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/expenses"
        );

        const data = await response.json();

        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [refresh]);

  const totalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

  return (
    <div className="expense-list">
      <h2>Your Expenses</h2>

      <div className="expense-summary">
        <span>Total Expenses</span>
        <strong>${totalExpenses.toFixed(2)}</strong>
      </div>

      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            onExpenseChanged={onExpenseChanged}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;