import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { ErrorPage } from "../pages";
import { ChartContainer } from "../components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ChartContainer />,
            },
        ],
    },
]);

export default router;
