import React from "react";

// rrd imports
import { useLoaderData } from "react-router-dom";
// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

// helper functions
import { createBudget, fetchData, waiit } from "../helpers";

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
            <div className="gird-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
