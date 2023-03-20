import React from "react";

// rrd imports
import { useLoaderData } from "react-router-dom";
// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";

// helper functions
import { createBudget, createExpense, fetchData, waiit } from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  // to use them,pass them to useLoaderData hook
  return {
    userName,
    budgets,
  };
}

// action
// request comes from form which is submitted
export async function dashboardAction({ request }) {
  // manually making the create budget button disabled
  await waiit();

  // get all form data
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // create use cases for each submission

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome , ${values.userName}`);
    } catch (error) {
      console.log(error);
      throw new Error("There was a problem creating your account.");
    }
  }

  // create budget
  if (_action === "createBudget") {
    try {
      // get values from Budget form
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created !");
    } catch (error) {
      console.log(error);
      throw new Error("There was a problem creating your budget.");
    }
  }

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
}
const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    // conditional render the userName
    <>
      {userName ? (
        <div className="dashboard">
          <h2>
            Welcome back , <span className="accent">{userName}</span>
          </h2>
          <div className="grid-sm">
            {/* conditional rendering , if budget exists */}
            {budgets && budgets.length > 0 ? (
              <div className="gird-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="gird-sm">
                <p>Personal budgeting is secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
