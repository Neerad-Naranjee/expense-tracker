function ExpenseForm(props) {
  return (
    <div>
      <h2>{props.title}</h2>

      <input placeholder="Expense title" />
      <input placeholder="Amount" />
      <input placeholder="Category" />

      <button>Add Expense</button>
    </div>
  );
}

export default ExpenseForm;