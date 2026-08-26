import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleExpenseAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm
        title="Add a New Expense"
        onExpenseAdded={handleExpenseAdded}
      />

      <ExpenseList refresh={refresh} />
    </div>
  );
}

export default App;