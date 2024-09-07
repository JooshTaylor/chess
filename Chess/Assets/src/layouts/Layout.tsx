import { Outlet } from "react-router-dom";

// TODO: Build a sort of layout
export function Layout(): JSX.Element {
  return (
    <div>
      <Outlet />
    </div>
  )
}