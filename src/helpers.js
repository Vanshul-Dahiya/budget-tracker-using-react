export const waiit = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

// colors
const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 65% 50%  `;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  // check if budget already exists
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  // check if budget already exists
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  // check 2 things => 1. match budgetID
  // 2. Add all values to see total amount spent

  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId which is passed in
    if (expense.budgetId !== budgetId) return acc;
    // this if condition will return 0

    // add current amount to total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// Formatting

// format date
export const formatDateToLocaleString = (epoch) => {
  return new Date(epoch).toLocaleDateString("en-IN");
};

// formatting percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};
