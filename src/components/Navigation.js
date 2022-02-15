import { Link, Outlet, useLocation } from "react-router-dom";


export default function Navigation() {

  const location = useLocation();

  const selected = `bg-purple-800 text-white px-3 py-2 rounded-md text-sm font-medium`;
  const unselected = `text-gray-300 px-3 py-2 rounded-md text-black text-sm font-medium`;

  return (
    <div>
      <nav className="p-4">
        <ul className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <div className="mx-4 flex-shrink-0 flex items-center">
              <img className="lg:block h-8 w-auto" src="https://images.ctfassets.net/po4qc9xpmpuh/7itYmeRxmVGIXwwGWHrQU3/e4ea73c2bebc64bd65d84964576515b9/fauna-logo-new-v2.svg" alt="Fauna Inc" />
            </div>
          </Link>
          <div className="md:flex md:items-center md:space-x-2">
            <li className={location.pathname === '/' ? selected : unselected}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/dashboard' ? selected : unselected}>
              <Link to="/dashboard">Admin Dashboard</Link>
            </li>
          </div>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
