import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { VerifyAdminLoginEmail, AdminRoleLogin } from "../../api/controller/auth.controller";
import "../../styles/auth/auth.css";
import logo from "../../assets/Logo.png"
import { jsx } from "react/jsx-runtime";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [getLoader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const handleVerifyEmail = async () => {
    const data = {};
    setLoader(true);
    setEmailError("");
    setMessage("");

    if (!email.trim()) {
      setEmailError("Email is required");
      setLoader(false);
      return;
    }

    if (!email.includes("@")) {
      setEmailError("Enter a valid email address");
      setLoader(false);
      return;
    }
    data["adminEmail"] = email;

    const res = await VerifyAdminLoginEmail(data);

    if (!res.status || res.status !== 200) {
      if(res.data.tag && res.data.tag=="email"){
        setEmailError(res.data.message);
      }
      if(res.data.tag && res.data.tag=="otp"){
        setOtpError(res.data.message);
      }
      setMessage("OTP not sent, try again later");
      setLoader(false);
      return;
    }

    setIsEmailVerified(true);
    setMessage("OTP sent to your email successfully");
    setLoader(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    setLoader(true);
    setOtpError("");
    setPasswordError("");
    setMessage("");

    if (!isEmailVerified) {
      setEmailError("Please verify your email first");
      setLoader(false);
      return;
    }

    data["adminEmail"] = email;

    if (!otp.trim()) {
      setOtpError("OTP is required");
      setLoader(false);
      return;
    }

    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      setLoader(false);
      return;
    }
    data["otp"] = otp;

    if (!password.trim()) {
      setPasswordError("Password is required");
      setLoader(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoader(false);
      return;
    }

    data["password"] = password;

    const response = await AdminRoleLogin(data);

    if (!response.status || response.status !== 200) {
      if(response.data.tag && response.data.tag==="email"){
        setEmailError(response.data.message);
      }
      if(response.data.tag && response.data.tag==="otp"){
        setOtpError(response.data.message);
      }
      if(response.data.tag && response.data.tag==="password"){
        setPasswordError(response.data.message);
      }
      setMessage("Account not logged in, try again");
      setLoader(false);
      return;
    }
    
    const webData = {
      message: response.data.message,
      role: response.data.role,
      token: response.data.token,
      validTill: Date.now() + (7 * 24 * 60 * 60 * 1000)
    };
    localStorage.setItem("CampusCoreData", JSON.stringify(webData));

    const webSetting = {
      theam:"light",
    };
    if(! localStorage.getItem("CampusCoreSettings")){
      localStorage.setItem("CampusCoreSettings",JSON.stringify(webSetting));
    }

    setMessage("Login successful");
    setLoader(false);

    navigate("/admin/dashboard");
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/login-role"><b>⬅️Back</b></Link>
        <Link to="/" className="admin-login-logo">
          <img src={logo} className="pagelogo" alt="logo"/>
        </Link>

        <h1>Admin Login</h1>
        <p>Welcome back to CampusCore</p>

        {getLoader ? (
          <div className="auth-loader">Loading...</div>
        ) : (

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>

            <div className="email-row">
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEmailVerified}
                className={isEmailVerified ? "disabled-input" : ""}
              />

              {email.length > 0 && (
                <button
                  type="button"
                  className={isEmailVerified ? "verified-btn" : "verify-btn"}
                  onClick={handleVerifyEmail}
                  disabled={isEmailVerified}
                >
                  {isEmailVerified ? "Verified" : "Verify"}
                </button>
              )}
            </div>

            {emailError && <span className="error-text">{emailError}</span>}

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {passwordError && (
              <span className="error-text">{passwordError}</span>
            )}

            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />

            {otpError && <span className="error-text">{otpError}</span>}

            {message && <p className="success-text">{message}</p>}

            <button type="submit" className="admin-login-btn">
              Login
            </button>

            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/admin/signup">Create account</Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
};

export default AdminLogin;