import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import logo from "../../assets/Logo.png";

const Navbar = () => {
    const navigate = useNavigate();

    const [getAuthData, setAuthData] = useState(null);

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {return;}

        localStorage.removeItem("CampusCoreData");
        setAuthData(false);
        navigate("/");
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("CampusCoreData"));

        console.log("stored data => ",data);
        if (!data || Date.now() > data.validTill) {
            localStorage.removeItem("CampusCoreData");
            setAuthData(null);
            return;
        }
        setAuthData(data);
    }, []);

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
{getAuthData != null? 
        <div className="nav-actions">
            <Link to="/admin/dashboard" className="User-login-icon">
                <User />
            </Link>
            <button  className="login-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
:
        <div className="nav-actions">
            
                <Link to="/login-role" className="login-btn">
                    Login
                </Link>
                <Link to="/login-role" className="primary-btn" >
                    Get Started
                </Link>
        </div>
}
    </header>
    );
};

export default Navbar;