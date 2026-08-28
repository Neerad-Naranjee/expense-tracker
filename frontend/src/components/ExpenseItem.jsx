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
      <div className="expense-card">
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-group">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">
              Save
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="expense-card">
      <div className="expense-header">
        <h3>{expense.title}</h3>

        <span className="expense-amount">
          ${Number(expense.amount).toFixed(2)}
        </span>
      </div>

      <div className="expense-details">
        <p>
          <strong>Category:</strong> {expense.category}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>

      <div className="button-group">
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;