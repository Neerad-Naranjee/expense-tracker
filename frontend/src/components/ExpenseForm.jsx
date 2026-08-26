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
    props.onExpenseAdded(); // Notify parent component to refresh the expense list
  } catch (error) {
    console.error("Error creating expense:", error);
  }
};

  return (
    <div>
      <h2>{props.title}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>

      <h3>Current Form Data</h3>

      <p>Title: {title}</p>
      <p>Amount: {amount}</p>
      <p>Category: {category}</p>
      <p>Date: {date}</p>
    </div>
  );
}

export default ExpenseForm;