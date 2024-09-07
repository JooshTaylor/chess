import { Outlet } from "react-router-dom";

export function DashboardView(): JSX.Element {
  return (
    <div>
      Dashboard
      <Outlet />
    </div>
  );
}