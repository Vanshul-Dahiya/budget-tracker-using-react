import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import Main, { mainLoader } from "./layouts/Main";
// routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";

import Error from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        // path: "/",
        index:true,
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
