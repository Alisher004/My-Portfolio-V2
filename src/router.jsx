import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ResumePage from "./components/res";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: "/",
            element: <Home />
        }
        ,
        {
          path: "resume",
          element: <ResumePage />
        }
      ]
    }
]);
