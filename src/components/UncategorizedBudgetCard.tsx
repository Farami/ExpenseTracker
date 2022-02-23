import { UNCATEGORIZED_ID, useStore } from "../stores/BudgetStore";
import BudgetCard from "./BudgetCard";

type Props = {
  onViewExpensesClick: () => void;
  onAddExpenseClick: () => void;
};

export default function UncategorizedBudgetCard({
  onViewExpensesClick,
  onAddExpenseClick,
}: Props) {
  const getBudgetSum = useStore((store) => store.getBudgetSum);

  const amount = getBudgetSum(UNCATEGORIZED_ID);

  if (amount === 0) {
    return null;
  }

  return (
    <BudgetCard
      name="Uncategorized"
      amount={amount}
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
      gray
    />
  );
}
