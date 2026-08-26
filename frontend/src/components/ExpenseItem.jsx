import { useState } from "react";

function ExpenseItem({ expense, onExpenseChanged }) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date.slice(0, 10));

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/expenses/${expense._id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      console.log("Expense deleted:", data);

      onExpenseChanged();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      title,
      amount: Number(amount),
      category,
      date
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/expenses/${expense._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedExpense)
        }
      );

      const data = await response.json();

      console.log("Expense updated:", data);

      setIsEditing(false);

      onExpenseChanged();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  if (isEditing) {
    return (
      <div>
        <form onSubmit={handleUpdate}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="submit">Save</button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h3>{expense.title}</h3>

      <p>Amount: ${expense.amount}</p>

      <p>Category: {expense.category}</p>

      <p>Date: {expense.date}</p>

      <button onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default ExpenseItem;