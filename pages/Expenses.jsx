
import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import Expense from "./Expense";

export default function Expenses() {
  const { expenses, deleteExpense } = useFinance();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (confirmed) {
      deleteExpense(id);
    }
  };

  return (
    <div className="page-container">
      <div className="panel-header">
        <div>
          <h1>My Expenses</h1>
          <p>View and manage your recorded expenses.</p>
        </div>

        <Link to="/expenses/add" className="btn btn-primary">
          + Add Expense
        </Link>
      </div>

      <section className="panel">
        {expenses.length > 0 ? (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {[...expenses]
                  .sort(
                    (a, b) =>
                      new Date(b.date) - new Date(a.date)
                  )
                  .map((expense) => (
                    <Expense
                      key={expense.id}
                      expense={expense}
                      handleDelete={handleDelete}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h2>No expenses yet</h2>
            <p>Start by recording your first expense.</p>

            <Link
              to="/expenses/add"
              className="btn btn-primary"
            >
              Add Your First Expense
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
