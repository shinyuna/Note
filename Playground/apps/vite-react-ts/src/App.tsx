import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import AppProvider from "./AppProvider";
import CampFirePage from "./pages/campFire/campFire.page";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <Outlet />
      </AppProvider>
    ),
    children: [
      {
        path: "/camp-fire",
        element: <CampFirePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
