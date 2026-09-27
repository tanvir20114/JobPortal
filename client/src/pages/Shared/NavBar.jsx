import React, { use } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../../context/AuthContext';
import { notifySuccess, notifyError } from '../../utils/notify.js'


const linkClass = ({ isActive }) =>
  isActive
    ? 'font-semibold text-primary bg-primary/10'
    : 'font-medium hover:text-primary';

export default function NavBar() {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      notifySuccess('sign out successful')
    }).catch(error => {
      notifyError(error);
    })
  }

  const links = <>
    <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
    {
      user && <>
        <li><NavLink to="/myApplications" className={linkClass}>My Applications</NavLink></li>
        <li><NavLink to="/addJob" className={linkClass}>Add Job</NavLink></li>
        <li><NavLink to="/myPostedJobs" className={linkClass}>My Posted Jobs</NavLink></li>
        <li><NavLink to="/messages" className={linkClass}>MessagesList</NavLink></li>
      </>
    }
  </>

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-200 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-base-200 gap-1">
              {links}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl font-bold tracking-tight">
            <span className="text-primary">Career</span>Code
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {user
            ? <button onClick={handleSignOut} className="btn btn-outline btn-error btn-sm">Sign Out</button>
            : <>
              <NavLink className="btn btn-ghost btn-sm" to="/register">Register</NavLink>
              <NavLink className="btn btn-primary btn-sm" to="/signIn">SignIn</NavLink>
            </>
          }
        </div>
      </div>
    </header>
  )
}