import React from "react";

// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// helper functions
import { fetchData } from "../helpers";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return {
    userName,
  };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <h1>main</h1>
      {/* all children  */}
      <Outlet />
      <h1>main</h1>
    </div>
  );
};

export default Main;
