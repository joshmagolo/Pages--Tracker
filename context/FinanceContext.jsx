
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("expenses")) || [];
    } catch {
      return [];
    }
  });

  const [income, setIncome] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("income")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  const addExpense = (formData) => {
    const newExpense = {
      ...formData,
      id: crypto.randomUUID(),
      amount: Number(formData.amount),
    };

    setExpenses((previous) => [...previous, newExpense]);
  };

  const updateExpense = (id, updatedData) => {
    setExpenses((previous) =>
      previous.map((expense) =>
        String(expense.id) === String(id)
          ? { ...expense, ...updatedData, amount: Number(updatedData.amount) }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((previous) =>
      previous.filter(
        (expense) => String(expense.id) !== String(id)
      )
    );
  };

  const categoryTotals = useMemo(() => {
    return expenses.reduce((totals, expense) => {
      const category = expense.category || "Other";
      totals[category] =
        (totals[category] || 0) + Number(expense.amount || 0);
      return totals;
    }, {});
  }, [expenses]);

  const totals = useMemo(() => {
    const totalIncome = income.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [income, expenses]);

  const value = {
    expenses,
    income,
    totals,
    categoryTotals,
    addExpense,
    updateExpense,
    deleteExpense,
    setIncome,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used inside FinanceProvider");
  }

  return context;
}
