import React from "react";

// rrd imports
import { useLoaderData } from "react-router-dom";
// library imports
import { toast } from "react-toastify";
// components
import Intro from "../components/Intro";

// helper functions
import { fetchData } from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return {
    userName,
  };
}

// action
// request comes from form which is submitted
export async function dashboardAction({ request }) {
  // get all form data
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  console.log("username from dashboard- ", formData);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome , ${formData.userName}`);
  } catch (error) {
    console.log(error);
    throw new Error("There was a problem creating your account.");
  }
}
const Dashboard = () => {
  const { userName } = useLoaderData();
  return (
    // conditional render the userName
    <>{userName ? <p>{userName}</p> : <Intro />}</>
  );
};

export default Dashboard;
