import React, { useState } from "react";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";
import ButtonLoading from "../../Helper/ButtonLoading";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // install react-icons if not already
import { useNavigate , useLocation } from "react-router-dom"; // ✅ import navigate hook
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";

function Partnerlogin({ setIsPartnerLogin }) {
  const {partnerLogin} = usePartnerLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

     const navigate = useNavigate(); 
     const location = useLocation();
     
       const from = location.state?.from?.pathname || "/Profile";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/partner_login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        console.log("Login Success:", data);
      
        partnerLogin({
        access: data.data.access,
        refresh: data.data.refresh,
        email: data.data.email,
        username: data.data.username,
        user_id : data.data.user_id,
        code : data?.data?.usermaster?.access_type?.code,
        accesstypename : data?.data?.usermaster?.access_type?.access_type_name,
        userType : data?.data?.usermaster?.user_type?.code,
        userTypename : data?.data?.usermaster?.user_type?.name,
      });

       
        showToast(data.message || "success"); 
        setUsername("");
        setPassword("");
        
    navigate(from, { replace: true });
    
      } else {
        showToast(data.message || "Submission failed", "error");    
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <h4 className="fw-bold mb-2">Enter Your Partner Credentials</h4>
      <p className="text-muted small mb-4">
        Enter your Partner username & password to access your account.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

            <div className="position-relative">
        <input
        type={showPassword ? "text" : "password"}
         className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
         />
     <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#6c757d",
        }}
      >

        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
  </div>

        {error && <p className="text-danger small">{error}</p>}

        <button type="submit" className="btn btn-success w-100 mb-3" disabled={loading}>
          {loading ?<> <ButtonLoading/> login...  </>  : "Login"}
        </button>
      </form>

      <a
        href="#"
        className="d-block text-decoration-none text-success fw-bold"
        onClick={(e) => {
          e.preventDefault();
          setIsPartnerLogin(false);
        }}
      >
        Back to Parents Login
      </a>
    </>
  );
}

export default Partnerlogin;
