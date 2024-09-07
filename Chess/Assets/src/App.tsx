import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChessBoard } from './components/board/ChessBoard';
import { DashboardView } from "./views/dashboard/DashboardView";
import { Layout } from "./layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardView />
      },
      {
        path: "chess",
        element: <ChessBoard />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}
export default App;
