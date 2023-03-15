import React from "react";
import { Form } from "react-router-dom";
// library
import { UserPlusIcon } from "@heroicons/react/24/solid";
// assets
import illustration from "../assets/illustration.jpg";
const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        {/* it will submit to this exact page like html form .... in this case Dashboard */}
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your name"
            autoComplete="given-name"
          />
        </Form>
        <button type="submit" className="btn btn--dark">
          <span>Create Account</span>
          <UserPlusIcon width={20} />
        </button>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
