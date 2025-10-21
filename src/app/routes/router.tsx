import { createBrowserRouter } from "react-router";
import { ROUTES } from "./routes";
import { Layout } from "../global/Layout";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Layout />,
  },
]);
