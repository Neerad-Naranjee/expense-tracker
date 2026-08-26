function ExpenseItem({ expense, onExpenseDeleted }) {
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

      onExpenseDeleted();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <h3>{expense.title}</h3>

      <p>Amount: ${expense.amount}</p>

      <p>Category: {expense.category}</p>

      <p>Date: {expense.date}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ExpenseItem;