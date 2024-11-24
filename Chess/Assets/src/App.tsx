import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DashboardView } from "./views/dashboard/DashboardView";
import { Layout } from "./layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorView } from "./views/error/ErrorView";
import { RegisterView } from "./views/register/RegisterView";
import { LoginView } from "./views/login/LoginView";
import { SignalRProvider } from "./context/SignalRContext";
import { GameView } from "./views/game/GameView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <DashboardView />
      },
      {
        path: "register",
        element: <RegisterView />
      },
      {
        path: "login",
        element: <LoginView />
      },
      {
        path: "games/:id",
        element: <GameView />,
      },
    ],
  },
]);

function App() {
  return (
    <SignalRProvider url="/gameHub">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SignalRProvider>
  );
}
export default App;
