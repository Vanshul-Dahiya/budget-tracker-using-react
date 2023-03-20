import React, { useEffect, useRef } from "react";
// rrd imports
import { Form, useFetcher } from "react-router-dom";
// lib imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  // get access to state of fetcher using useFetcher()
  const fetcher = useFetcher();
  // it will help in how UI should update
  const isSubmitting = fetcher.state === "submitting";
  // get access to form
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    // if it is done submitting => reset form and refocus on budget
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      {/* it will submit to it's current page */}
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="$40"
            required
            inputMode="decimal"
          />
          <input type="hidden" name="_action" value="createBudget" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting ...</span>
            ) : (
              <>
                <span>Create budget</span>
                <CurrencyDollarIcon width={20} />
              </>
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
