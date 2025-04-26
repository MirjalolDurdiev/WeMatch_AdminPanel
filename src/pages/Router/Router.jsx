import Home from "@/components/Home/Home";
import ProtectRoute from "@/components/ProtectRoute/ProtectRoute";
import Layout from "@/Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import Login from "../login/login";
import Opportunities from "../opportunities/opportunities";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          
          { path: "/opportunities", element: <Opportunities /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
