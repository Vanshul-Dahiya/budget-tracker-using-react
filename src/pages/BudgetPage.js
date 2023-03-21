import React from "react";
// rrd imp
import { useLoaderData } from "react-router-dom";

// lib import
import { toast } from "react-toastify";

import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you are trying to find does not exist.");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  // get all form data
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // create Expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`Expense  ${values.newExpense} created !`);
    } catch (error) {
      console.log(error);
      throw new Error("There was a problem creating your expense.");
    }
  }

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

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        {/* pass in just 1 budget , to limit it to current budget and not other budgets */}
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="gird-md">
          <h2>
            <span className="accent"> {budget.name} </span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
