import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChessBoard } from './components/board/ChessBoard';
import { DashboardView } from "./views/dashboard/DashboardView";
import { Layout } from "./layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorView } from "./views/error/ErrorView";
import { RegisterView } from "./views/register/RegisterView";
import { LoginView } from "./views/login/LoginView";

const queryClient = new QueryClient()

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
        path: "chess/:id",
        element: <ChessBoard />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;
