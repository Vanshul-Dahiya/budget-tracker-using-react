import React from "react";
// rrd imp
import { redirect } from "react-router-dom";
// lib imp
import { toast } from "react-toastify";
// helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

const deleteBudget = ({ params }) => {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("Budget deleted successfully");
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }
  return redirect("/");
};

export default deleteBudget;
