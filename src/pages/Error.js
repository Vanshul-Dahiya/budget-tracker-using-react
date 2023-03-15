import React from "react";
import { useRouteError, Link, useNavigate } from "react-router-dom";
// lib imports
import { HomeIcon,ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
const Error = () => {
  const error = useRouteError();
  const navigate= useNavigate()
  console.log("error -  ", error);
  return (
    <div className="error">
      <h1>Oh! We've got a problem here.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        {/* go to previous route , using rrd history . Use useNavigate hook*/}
        <button className="btn btn--dark" onClick={()=>navigate(-1)} > <ArrowUturnLeftIcon width={20} />  <span>Go Back</span> </button>
        <Link to='/' className="btn btn--dark" >
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
