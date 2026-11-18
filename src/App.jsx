
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { FinanceProvider } from "../context/FinanceContext";

import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import AddExpense from "../pages/AddExpense";
import EditExpense from "../pages/EditExpense";
import Reports from "../pages/Report";

import "./App.css";

function AppLayout() {
  return (
    <>
      <header className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="brand">
            Pages Tracker
          </NavLink>

          <nav>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/expenses">Expenses</NavLink>
            <NavLink to="/reports">Reports</NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/add" element={<AddExpense />} />
          <Route path="/expenses/edit/:id" element={<EditExpense />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Pages Tracker — Manage your finances wisely.</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </FinanceProvider>
  );
}
