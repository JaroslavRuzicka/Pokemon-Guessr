import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import PokemonOverviewPage from "../Pages/PokemonOverviewPage/PokemonOverviewPage";
import Abilites from "../Components/Abilities/Abilities";
import HeldItems from "../Components/HeldItems/HeldItems";
import LogInPage from "../Pages/LoginPage/LogInPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Sprites from "../Components/Sprites/Sprites";
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "*", element: <HomePage />},
            {path: "login", element: <LogInPage />},
            {path: "register", element: <RegisterPage />},
            {path: "leader-board", element: <LeaderBoard />},
            {path: "search", element: <ProtectedRoute><SearchPage /></ProtectedRoute>},
            {path: "pokemon/:ticker", element: <ProtectedRoute><PokemonOverviewPage /></ProtectedRoute>,
                children: [
                    {path:"abilities", element: <Abilites/>},
                    {path:"base-stats", element: <Sprites/>},
                    {path:"held-items", element: <HeldItems/>}

                ]
            },
        ]
    }
])