import { useState } from "react";
import "../css/layout.css";
import { NavLink, Outlet, useLocation } from "vite-react-router-dom";
import { useEffect } from "react";

const routesAvailable = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "How to use",
    route: "/how-to-use",
  },
  {
    title: "About",
    route: "/about",
  },
];

const App = () => {
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="app">
      <nav className="menu-bar">
        <div className="logo">Your Logo</div>
        <div className="menu-items">
          {routesAvailable.map(({ route, title }) => (
            <NavLink key={route} to={route}>
              {title}
            </NavLink>
          ))}
        </div>
        <div className="menu-toggle" onClick={toggleDrawer}>
          <div className={`menu-icon ${drawerOpen && "open"}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </nav>
      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        {routesAvailable.map(({ route, title }) => (
          <NavLink key={route} to={route}>
            {title}
          </NavLink>
        ))}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
