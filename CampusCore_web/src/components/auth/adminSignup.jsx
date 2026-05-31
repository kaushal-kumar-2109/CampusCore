import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import "../../styles/auth/auth.css";
import logo from "../../assets/Logo.png";
import { AdminRoleSignup, VerifyAdminSignupEmail } from "../../api/controller/auth.controller";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [getLoader, setLoader] = useState(false);

  const [adminName,setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminNumber, setAdminNumber] = useState("");

  const [collegeName, setCollegeName] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  const [collegeType, setCollegeType] = useState("");

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const [adminNameError,setAdminNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [adminNumberError, setAdminNumberError] = useState("");

  const [collegeNameError, setCollegeNameError] = useState("");
  const [collegeCodeError, setCollegeCodeError] = useState("");
  const [collegeTypeError, setCollegeTypeError] = useState("");

  const [otpError, setOtpError] = useState("");
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

    const res = await VerifyAdminSignupEmail(data);

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
    setCollegeNameError("");setCollegeCodeError("");setCollegeTypeError("");
    setOtpError("");
    setEmailError("");setAdminNameError("");setAdminNumberError("");setPasswordError("");
    setMessage("");

    if(!adminName){
      setAdminNameError("Admin name is required");
      setLoader(false);
      return;
    }
    data["adminName"] = adminName;

    if(!adminNumber){
      setAdminNumberError("Admin number is required");
      setLoader(false)
      return;
    }
    data["adminContactNumber"] = adminNumber;

    if(!collegeName){
      setCollegeNameError("Collage name required");
      setLoader(false);
      return;
    }
    data["collegeName"] = collegeName;

    if(!collegeCode){
      setCollegeCodeError("Collage code required");
      setLoader(false);
      return;
    }
    data["collegeCode"] = collegeCode;

    if(!collegeType || collegeType == ""){
      setCollegeTypeError("Collage type required");
      setLoader(false);
      return;
    }
    data["collegeType"] = collegeType;

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

    const response = await AdminRoleSignup(data);

    if (!response.status || response.status !== 200) {
      if(response.data.tag && response.data.tag==="email"){
        setEmailError(response.data.message);
      }
      if(response.data.tag && response.data.tag==="otp"){
        setOtpError(response.data.message);
      }
      if(response.data.tag && response.data.tag==="collegeCode,collegeNane"){
          setCollegeCode(response.data.message);
          setCollegeName(response.data.message);
      }
      if(response.data.tag && response.data.tag==="adminEmail,adminContactNumber"){
          setCollegeCode(response.data.message);
          setCollegeName(response.data.message);
      }
      setMessage("Account not logged in, try again");
      setLoader(false);
      return;
    }

    setMessage("Login successful");
    setLoader(false);

    navigate("/admin/login");
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/login-role"><b>⬅️Back</b></Link>
        <Link to="/" className="admin-login-logo">
          <img src={logo} className="pagelogo" alt="logo"/>
        </Link>

        <h1>Admin Signup</h1>
        <p>Welcome to CampusCore</p>

        {getLoader ? (
          <div className="auth-loader">Loading...</div>
        ) : (

          <form onSubmit={handleSubmit}>
            <label>Admin Name</label>
            <input
              type="text"
              placeholder="Enter Your Name "
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            {adminNameError && (
              <span className="error-text">{adminNameError}</span>
            )}

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

            <div className="two-fields">
                <div className="field1"> 
                    <label>Contact </label>
                    <input
                      type="text"
                      placeholder="+91 XXXXXXXXXX"
                      value={adminNumber}
                      onChange={(e) => setAdminNumber(e.target.value)}
                    />
                    {adminNumberError && (
                      <span className="error-text">{adminNumberError}</span>
                    )}
                </div>

                <div className="field2">
                    <label>OTP</label>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                    {otpError && <span className="error-text">{otpError}</span>}
                </div>
            </div>

            <label>College Name</label>
            <input
              type="text"
              placeholder="Enter The College Name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
            {collegeNameError && (
              <span className="error-text">{collegeNameError}</span>
            )}

            <div className="two-fields">

                <div className="field1">
                    <label>College Code</label>
                    <input
                      type="text"
                      placeholder="Enter College Code"
                      value={collegeCode}
                      onChange={(e) => setCollegeCode(e.target.value)}
                    />
                    {collegeCodeError && (
                      <span className="error-text">{collegeCodeError}</span>
                    )}
                </div>

                <div className="field2">
                    <label>College Type</label>
                    <select
                        value={collegeType}
                        onChange={(e) => setCollegeType(e.target.value)}
                    >
                        <option className="otptions" value="">Select College Type</option>
                        <option className="otptions" value="School">School</option>
                        <option className="otptions" value="College">College</option>
                        <option className="otptions" value="University">University</option>
                        <option className="otptions" value="Institute">Institute</option>
                    </select>
                    {collegeTypeError && (
                      <span className="error-text">{collegeTypeError}</span>
                    )}
                </div>
            </div>

            {message && <p className="success-text">{message}</p>}

            <button type="submit" className="admin-login-btn">
              Create Your Account
            </button>

            <p className="signup-text">
              Already have an account?{" "}
              <Link to="/admin/login">Login account</Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
};

export default AdminSignup;