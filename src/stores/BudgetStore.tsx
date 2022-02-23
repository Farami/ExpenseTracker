import { v4 as uuidv4 } from "uuid";
import create from "zustand";
import { persist } from "zustand/middleware";

export const UNCATEGORIZED_ID = "UNCATEGORIZED";

type BudgetsStore = {
  budgets: Budget[];
  expenses: Expense[];

  getBudgetExpenses: (budgetId: string) => Expense[];
  getBudgetSum: (budgetId: string) => number;

  addBudget: (name: string, max: number) => void;
  addExpense: (budgetId: string, description: string, amount: number) => void;

  deleteBudget: (id: string) => void;
  deleteExpense: (expenseId: string) => void;
};

export const useStore = create<BudgetsStore>(
  persist(
    (set, get) => ({
      budgets: [],
      expenses: [],

      getBudgetExpenses: (budgetId: string) =>
        get().expenses.filter((expense) => expense.budgetId === budgetId),

      getBudgetSum: (budgetId: string) =>
        get()
          .getBudgetExpenses(budgetId)
          .reduce((sum, expense) => sum + expense.amount, 0),

      addBudget: (name: string, max: number) => {
        const budgets = get().budgets;
        if (budgets.find((budget) => budget.name === name)) {
          return;
        }

        set({
          budgets: [
            ...budgets,
            {
              id: uuidv4(),
              name,
              max,
            },
          ],
        });
      },

      addExpense: (budgetId: string, description: string, amount: number) =>
        set({
          expenses: [
            ...get().expenses,
            {
              id: uuidv4(),
              budgetId,
              description,
              amount,
            },
          ],
        }),

      deleteBudget: (id: string) => {
        const expenses = get().expenses;
        const budgets = get().budgets;

        set({
          budgets: budgets.filter((budget) => budget.id !== id),
          expenses: expenses.map((expense) => ({
            ...expense,
            budgetId:
              expense.budgetId === id ? UNCATEGORIZED_ID : expense.budgetId,
          })),
        });
      },

      deleteExpense: (expenseId: string) =>
        set({
          expenses: get().expenses.filter(
            (expense) => expense.id !== expenseId
          ),
        }),
    }),
    {
      name: "budgets",
    }
  )
);
