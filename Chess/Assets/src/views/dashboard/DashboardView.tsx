import { Link } from "react-router-dom";

export function DashboardView(): JSX.Element {
  return (
    <div>
      Dashboard

      <Link to='/chess'>
        Chess
      </Link>
    </div>
  );
}