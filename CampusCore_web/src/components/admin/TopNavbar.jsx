import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

const TopNavbar = ({ openSidebar, title = "Dashboard" }) => {
  return (
    <header className="admin-top-navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={openSidebar}>
          <Menu size={24} />
        </button>

        <div className="navbar-title">

          <h1>{title}</h1>
          {(title === "Dashboard") &&
          <p>Welcome back, Admin! 👋</p>
          }

        </div>

      </div>


      <div className="navbar-right">
        {/* <div className="navbar-search">
          <Search size={18} />
          <input type="text" placeholder="Search anything..." />
        </div> */}

        {/* <button className="navbar-date">
          <CalendarDays size={18} />
          <span>May 12 - May 18, 2025</span>
          <ChevronDown size={16} />
        </button> */}

        <button className="profile-avatar">
          <Bell size={21} />
          {/* <span>7</span> */}
        </button>

        <div className="navbar-profile">
          <div className="profile-avatar">A</div>
          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;