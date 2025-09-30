import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
// import Resume from "./components/res";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/projects/:id",
            element: <ProjectDetails />
        },
        // {
        //     path: "/resume",
        //     element: <Resume />
        // }
      ]
    }
]);
