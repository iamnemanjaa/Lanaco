import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <aside className={classes.aside}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to={"/invoices"}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <i className="bx bx-compass"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/customers"}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <i className="bx bx-layer"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/sellers"}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <i className="bx bx-target-lock"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default MainNavigation;
