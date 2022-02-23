import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { UNCATEGORIZED_ID, useStore } from "./stores/BudgetStore";

function App() {
  const budgets = useStore((state) => state.budgets);
  const getBudgetSum = useStore((state) => state.getBudgetSum);

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState<string | null>(
    null
  );
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState<
    string | null
  >(null);

  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h4 className="me-auto">Budgets</h4>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
          Add Budget
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => setAddExpenseBudgetId(UNCATEGORIZED_ID)}
        >
          Add Expense
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgets.map(({ id, name, max }) => {
          return (
            <BudgetCard
              key={id}
              name={name}
              amount={getBudgetSum(id)}
              max={max}
              onAddExpenseClick={() => setAddExpenseBudgetId(id)}
              onViewExpensesClick={() => setViewExpensesBudgetId(id)}
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={() => setAddExpenseBudgetId(UNCATEGORIZED_ID)}
          onViewExpensesClick={() => setViewExpensesBudgetId(UNCATEGORIZED_ID)}
        />
        <TotalBudgetCard />
      </div>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        budgetId={addExpenseBudgetId}
        handleClose={() => setAddExpenseBudgetId(null)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesBudgetId}
        handleClose={() => setViewExpensesBudgetId(null)}
      />
    </Container>
  );
}

export default App;
