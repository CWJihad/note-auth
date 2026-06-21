import {
  BookOpen,
  LogOut,
  MessageSquare,
  NotebookPen,
  User,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getData } from "@/context/userContext";
import axios from "axios";
import { VITE_API_URL } from "../index.js";

const Navbar = () => {
  const { user, setUser, authLoading } = getData();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false)  // ← mobile sidebar state

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileOpen(false)  // ← close sidebar on nav click
    if (isMainPage) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 10000);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Logout error: ", err);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setMobileOpen(false)
    navigate("/login");
  };

  const changeSection = () => {
    setActiveSection("");
    setMobileOpen(false)
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <>
      <nav className="p-3 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-1">
            <BookOpen className="h-6 w-6 text-orange-700" />
            <h1 className="font-bold text-xl">
              <span className="text-orange-600">Notes</span>
            </h1>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-7 items-center">
            <ul className="flex gap-7 items-center text-lg font-semibold">
              {["home", "features", "about", "reviews"].map((section) => (
                <li
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`cursor-pointer capitalize transition-all duration-200 ${
                    isMainPage && activeSection === section
                      ? "border-b-2 border-[#ff6b35]"
                      : "text-gray-700 hover:text-[#ff6b35]"
                  }`}
                >
                  {section}
                </li>
              ))}

              {authLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar || ""} />
                      ) : (
                        <AvatarFallback>{initials}</AvatarFallback>
                      )}
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link onClick={changeSection} className="flex gap-2 items-center" to="/profile">
                          <User />Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link className="flex gap-2" to="/notes">
                          <NotebookPen />Notes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link className="flex gap-2 items-center" to="/feedback">
                          <MessageSquare size={16} />Feedback
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="text-red-600 font-semibold cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut />Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-gray-800 border hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Mobile — right side: avatar + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <Avatar className="cursor-pointer w-8 h-8">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} />
                ) : (
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                )}
              </Avatar>
            ) : null}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-700" />
            <span className="font-bold text-orange-600">Notes</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-orange-50">
            <Avatar className="w-10 h-10">
              {user.avatar ? (
                <AvatarImage src={user.avatar} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-semibold text-sm text-[#1a1a2e]">
                {user.fullName || user.username}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <div className="p-4 space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Navigation
          </p>
          {["home", "features", "about", "reviews"].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#ff6b35] transition-all capitalize"
            >
              {section}
            </button>
          ))}
        </div>

        {/* Account links — only if logged in */}
        {user && (
          <div className="p-4 space-y-1 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
              Account
            </p>
            <Link
              to="/profile"
              onClick={changeSection}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#ff6b35] transition-all"
            >
              <User size={16} />Profile
            </Link>
            <Link
              to="/notes"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#ff6b35] transition-all"
            >
              <NotebookPen size={16} />Notes
            </Link>
            <Link
              to="/feedback"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#ff6b35] transition-all"
            >
              <MessageSquare size={16} />Feedback
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={16} />Logout
            </button>
          </div>
        )}

        {/* Login/Signup — only if not logged in */}
        {!user && !authLoading && (
          <div className="p-4 space-y-2 border-t border-gray-100">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;