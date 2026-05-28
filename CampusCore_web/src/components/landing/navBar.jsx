import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";

const Navbar = () => {
    return (
    <header className="navbar">
        <div className="logo">
            <div className="logo-icon">
                <img src={logo} className="logo-icon-image"/>
            </div>
            <span>CampusCore</span>
        </div>

        <nav className="nav-links">
            <a href="#about">About Us</a>
            <a href="#features">Features</a>
            <a href="#modules">Modules</a>
            {/* <a href="#pricing">Pricing</a> */}
            <a href="#why-section">Why us</a>
        </nav>

        <div className="nav-actions">
            <Link to="/login-role" className="login-btn">
                Login
            </Link>
            <Link to="/login-role" className="primary-btn">
                Get Started
            </Link>
        </div>
    </header>
    );
};

export default Navbar;