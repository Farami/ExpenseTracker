import React from "react";
import { useStore } from "../stores/BudgetStore";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const expenses = useStore((store) => store.expenses);
  const budgets = useStore((store) => store.budgets);

  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) {
    return null;
  }

  return <BudgetCard name="Total" amount={amount} max={max} gray hideButtons />;
}
