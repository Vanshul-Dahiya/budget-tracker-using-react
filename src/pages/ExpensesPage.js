import React from "react";
// rrd import
import { useLoaderData } from "react-router-dom";
// lib import
import { toast } from "react-toastify";
// component imports
import Table from "../components/Table";
// helper import
import { deleteItem, fetchData } from "../helpers";

// loader
export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  // to use them,pass them to useLoaderData hook
  return {
    expenses,
  };
}

// action
export async function expensesAction({ request }) {
  // get all form data
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // delete Expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted !`);
    } catch (error) {
      console.log(error);
      throw new Error("There was a problem deleting your expense.");
    }
  }
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
