import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Header = () => {
  const { user, LogOut } = useContext(AuthContext);
  const navLinks = (
    <>
      {user ? (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="ml-4">
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="mx-4">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
    </>
  );
  const handleLogOut = () => {
    LogOut()
      .then(() => {
        Swal.fire(
          "Successfull",
          "You Successfully logout from our website.",
          "success"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <span className="mr-2">{user.email}</span>
            <a className="btn btn-sm" onClick={handleLogOut}>
              Sign Out
            </a>
          </>
        ) : (
          <Link to="/login" className="btn btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;