import { createBrowserRouter } from "react-router-dom";
import MainScreen from "../screens/main-screen";
import CaptureTaskDetails from "../screens/capture-task-details";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainScreen />,
        errorElement: <MainScreen />
    },
    {
        path: "/capture-details",
        element: <CaptureTaskDetails />,
        errorElement: <MainScreen />
    }     
]);