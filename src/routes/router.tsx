import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { ErrorPage, MainPage } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
        ],
    },
]);

export default router;
