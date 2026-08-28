import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleExpenseChanged = () => {
    setRefresh((previous) => !previous);
  };

  return (
    <div className="app">
      <div className="container">
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
    </div>
  );
}

export default App;