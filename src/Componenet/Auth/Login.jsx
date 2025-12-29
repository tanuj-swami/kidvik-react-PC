import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Partnerlogin from "./Partnerlogin";
import { BASE_URL } from "../../Helper/Base_Url";
import ButtonLoading from "../../Helper/ButtonLoading";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ import navigate hook
import { showToast } from "../../Helper/toastService";
import { useLogin } from "../../Contaxt/Login_Contaxt";

function Login() {
  const [isPartnerLogin, setIsPartnerLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [login_Loading, setloading] = useState(false);
  const { login } = useLogin();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isFirstDone, setIsFirstDone] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [userExist, setUserExist] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   const [login_Loading , setloading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/Profile";

  // handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast("Please enter a valid 10-digit Indian mobile number.", "error");
      return;
    }


    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile_number: phone }),
      });

      const data = await response.json();
      console.log("data", data)
      if (response.ok) {
        showToast(data.message, "success")
        setUserExist(data.user_exist);
        setShowOtp(true);
        setIsFirstDone(data?.first_time_login);
        console.log(data);

      } else {
        showToast(data.message || "Submission failed", "error");
        console.error("Failed to send OTP:", response.status);
      }
    } catch (error) {
      console.error("Error while sending OTP:", error);
    }
    finally {
      setloading(false);
    }
  };

  const Verifyuser = async (e) => {
    e.preventDefault();
    if (userExist === false) {
      // For new user (Create Password)
      if (passwordError) {
        showToast("Please enter a valid password.", "error");
        return;
      }

      if (password !== confirmPassword) {
        showToast("Passwords do not match.", "error");
        return;
      }
    }

    if (isFirstDone && !isAccepted) {
      showToast("Please accept Terms & Conditions.", "error");
      return;
    }

    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: phone,
          user_exist: userExist,
          password: password
          // otp: otp

        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("data", data);
        showToast(data.message, "success")
        setPassword("")
        setConfirmPassword("");
        login({
          accessToken: data.data.access,
          refreshToken: data.data.refresh,
          userId: data.data.user_id,
          username: data.data.username,
        });
        navigate(from, { replace: true });

      } else {
        console.error("Failed to send OTP:", response.status);
        showToast(data.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Error while sending OTP:", error);
    } finally {
      setloading(false);

    }

  }


  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");

    if (val.length <= 10) {
      setPhone(val);
    }

    if (val === "") {
      setError("");
      return;
    }

    if (!/^[6-9]/.test(val)) {
      setError("Indian numbers start with 6, 7, 8, or 9");
      return;

    }

    if (val.length < 10) {
      setError("Please enter a 10-digit mobile number");
      return;
    }

    // 3) Valid number
    setError("");
  };


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Regex: Minimum 8 characters, at least 1 letter, 1 special char
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters and include 1 letter and 1 special character"
      );
    } else {
      setPasswordError("");
    }
  };


  useEffect(() => {
    if (!isFirstDone) {
      setIsAccepted(true);
    } else {
      setIsAccepted(false);
    }
  }, [isFirstDone]);


  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light ">
      <div
        className="card shadow border-3 rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body text-center p-4">

          {/* Logo */}
          <img
            src="/img/logo/Kidvik_Final_logo01.jpg.png"
            alt="Kidvik Logo"
            className="mb-4 img-fluid"
            style={{ width: "110px", height: "110px", objectFit: "contain" }}
          />

          {/* MAIN LOGIN UI */}
          {!isPartnerLogin ? (
            <>
              {!showOtp ? (
                <>
                  <h4 className="fw-bold mb-1">Enter Your Phone Number</h4>
                  <p className="text-muted small mb-4">
                    We’ll send you a 6-digit verification code.
                  </p>

                  {/* Phone Number Row */}
                  <div className="row g-2 mb-3 align-items-center">

                    {/* Country Code */}
                    {/* <div className="col-4 col-sm-3 col-md-4">
                      <select
                        className="form-select py-2 px-2 shadow-sm text-primary fw-semibold border-primary"
                        style={{ borderRadius: "6px" }}
                      >
                        <option value="IN">+91</option>
                      </select>
                    </div> */}

                    <div className="col-4 col-sm-3 col-md-4 d-flex align-items-center justify-content-center">
                      <span
                        className="form-control border-primary text-center py-2 px-2 shadow-sm text-primary fw-semibold"
                        style={{ borderRadius: "6px", backgroundColor: "#fff", pointerEvents: "none" }}
                      >
                        +91
                      </span>
                    </div>


                    {/* Input */}
                    <div className="col-8 col-sm-9 col-md-8">
                      <form id="mobilnumberform" onSubmit={handleSendOtp}>
                        <input
                          type="tel"
                          className="form-control border-primary py-2 px-3 shadow-sm"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={handleChange}
                          maxLength={10}
                          pattern="\d{10}"
                          required
                          style={{ borderRadius: "6px" }}
                        />
                      </form>
                    </div>
                  </div>

                  {error && (
                    <small className="text-danger d-block mb-2">{error}</small>
                  )}

                  {/* Send OTP Button */}
                  <button
                    className="btn btn-primary w-100 py-2 fw-semibold mb-3"
                    form="mobilnumberform"
                    type="submit"
                    style={{ borderRadius: "8px" }}
                  >
                    {login_Loading ? (
                      <>
                        <ButtonLoading /> Processing….
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="text-start mb-3">
                    <button
                      type="button"
                      className="btn btn-link text-primary fw-semibold p-0"
                      onClick={() => {
                        setShowOtp(false);
                        setPassword("");
                        setConfirmPassword("");
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      ← Back
                    </button>
                  </div>
                    <p className="text-primary fw-semibold mb-2">
                        Verifying Mobile: <span className="fw-bold">{phone}</span>
                      </p>

                  {userExist === true ? (
                    <>
                    
                    <h4 className="fw-bold mb-2">Enter Password</h4>
                    {/* <p className="text-muted small mb-3">
                    Enter the 6-digit code we sent to your mobile.
                 </p> */}

                    <form onSubmit={Verifyuser} id="Verifyuserform">
                      <input
                        type="password"
                        className="form-control mb-3 py-2 shadow-sm"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                    </form>

                    {isFirstDone && (
                      <div className="form-check mt-3 text-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="termsCheck"
                          checked={isAccepted}
                          onChange={(e) => setIsAccepted(e.target.checked)}
                        />
                        <label className="form-check-label small" htmlFor="termsCheck">
                          I accept the Terms & Conditions
                        </label>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3 py-2 fw-semibold"
                      form="Verifyuserform"
                      disabled={!isAccepted || login_Loading}
                      style={{ borderRadius: "8px" }}
                    >
                      {login_Loading ? (
                        <>
                          <ButtonLoading />  Logging In…
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </>
                  ) : (
                    <>
                      <h4 className="fw-bold mb-2">Create Your Password</h4>
                      <form onSubmit={Verifyuser} id="Verifyuserform">

                        <input
                          type="password"
                          className="form-control mb-1 py-2 shadow-sm"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />

                        {passwordError && (
                          <small className="text-danger d-block mb-2">{passwordError}</small>
                        )}

                        <input
                          type="password"
                          className="form-control mb-3 py-2 shadow-sm"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />

                        {password && confirmPassword && password !== confirmPassword && (
                          <small className="text-danger">
                            Passwords do not match
                          </small>
                        )}

                        {isFirstDone && (
                          <div className="form-check mt-3 text-start">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="termsCheck"
                              checked={isAccepted}
                              onChange={(e) => setIsAccepted(e.target.checked)}
                            />
                            <label className="form-check-label small" htmlFor="termsCheck">
                              I accept the Terms & Conditions
                            </label>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="btn btn-primary w-100 mt-3 py-2 fw-semibold"
                          form="Verifyuserform"
                          disabled={!isAccepted || login_Loading || password !== confirmPassword}
                          style={{ borderRadius: "8px" }}
                        >
                          {login_Loading ? <><ButtonLoading /> Creating…</> : "Create Account"}
                        </button>

                      </form>


                    </>
                  )}







                </>
              )}

              {/* Terms + Privacy */}
              <p className="small text-muted mt-3 mb-2">
                By continuing, you agree to our{" "}
                <a href="/termsnconditions" className="text-primary fw-semibold">
                  Terms
                </a>{" "}
                &{" "}
                <a href="/privacypolicy" className="text-primary fw-semibold">
                  Privacy Policy
                </a>
                .
              </p>

              {/* Partner Login */}
              <button
                className="btn btn-link text-primary fw-bold mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPartnerLogin(true);
                }}
                style={{ textDecoration: "none" }}
              >
                <i className="fas fa-user-shield me-2"></i> Partner Login
              </button>
            </>
          ) : (
            <Partnerlogin setIsPartnerLogin={setIsPartnerLogin} />
          )}
        </div>
      </div>
    </div>

  );
}

export default Login;
