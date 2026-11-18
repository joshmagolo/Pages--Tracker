
import { Link } from "react-router-dom";

export default function Expense({ expense, handleDelete }) {
  return (
    <tr>
      <td>{expense.title}</td>
      <td>{expense.category}</td>
      <td>{expense.date}</td>
      <td>
        KSh {Number(expense.amount).toLocaleString()}
      </td>
      <td>
        {expense.payment}
      </td>
      <td>
        <div className="expense-actions">
          <Link
            to={`/expenses/edit/${expense.id}`}
            className="edit-button"
          >
            Edit
          </Link>

          <button
            type="button"
            className="delete-button"
            onClick={() => handleDelete(expense.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
