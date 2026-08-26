import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleExpenseChanged = () => {
    setRefresh((previous) => !previous);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm
        title="Add a New Expense"
        onExpenseAdded={handleExpenseChanged}
      />

      <ExpenseList
        refresh={refresh}
        onExpenseChanged={handleExpenseChanged}
      />
    </div>
  );
}

export default App;