import { useState } from "react";

function ExpenseForm(props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      title,
      amount: Number(amount),
      category,
      date
    };

    console.log("Form submitted");
    console.log(expense);

    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
      });

      const data = await response.json();

      console.log("Expense created:", data);

      props.onExpenseAdded();

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div className="form-card">
      <h2>{props.title}</h2>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="e.g. Coffee"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="e.g. 5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            required
          />
        </div>

     <div className="form-group">
  <label htmlFor="category">Category</label>

  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option value="">Select a category</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
    <option value="Health">Health</option>
    <option value="Other">Other</option>
  </select>
</div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="add-button">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;