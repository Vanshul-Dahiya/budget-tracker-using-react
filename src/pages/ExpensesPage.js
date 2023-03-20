import React from "react";
// rrd import
import { useLoaderData } from "react-router-dom";
// component imports
import Table from "../components/Table";
// helper import
import { fetchData } from "../helpers";

// loader
export function expensesLoader() {
  const expenses = fetchData("expenses");
  // to use them,pass them to useLoaderData hook
  return {
    expenses,
  };
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small> ({expenses.length} total) </small>{" "}
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}
    </div>
  );
};

export default ExpensesPage;
