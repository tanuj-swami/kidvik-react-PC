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
  //   const [login_Loading , setloading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/Profile";

  // handle Send OTP
  const handleSendOtp = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile_number: phone }),
      });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message, "success")
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
    setloading(true);
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: phone,
          otp: otp
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("data", data);
        showToast(data.message, "success")

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
    const val = e.target.value.replace(/\D/g, ""); // सिर्फ digit
    if (val.length <= 10) {
      setPhone(val);
    }
    if (val.length > 0 && val.length < 10) {
      setError("Please enter a 10-digit mobile number");
    } else {
      setError("");
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
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light p-3 rounded-10">
      <div
        className="card shadow-lg border-1 rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body text-center p-5 bg-light">
          {/* Logo */}
          <img
            src="/img/logo/Kidvik_Final_logo01.jpg.png"
            alt="Kidvik Logo"
            className="mb-4 img-fluid"
            style={{ width: "120px", height: "120px", objectFit: "contain" }}
          />

          {/* Conditional UI */}
          {!isPartnerLogin ? (
            <>
              {!showOtp ? (
                <>
                  {/* Phone Number Login */}
                  <h4 className="fw-bold mb-2">Add Your Phone Number</h4>
                  <p className="text-muted small mb-4">
                    Enter your phone number in order to send your OTP security code.
                  </p>

                  <div className="row   mb-3">
                    {/* Country Code Select */}
                    <div className="col-lg-4 col-sm-2">
                      <select
                        className="form-select rounded-pill py-2 shadow-sm text-primary fw-semibold text-center"
                        // style={{ minWidth: "120px" }}
                      >
                        <option value="IN">🇮🇳 +91</option>
                      </select>
                    </div>

                    {/* Phone Number Input */}
                    <div className="col-lg-8  col-sm-9">
                      <form id="mobilnumberform" onSubmit={handleSendOtp} className="w-100">
                        <input
                          type="tel"
                          className="form-control border-2 border-primary rounded-pill py-2 shadow-sm"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={handleChange}
                          maxLength={10}
                          pattern="\d{10}"
                          required
                        />
                      </form>
                    </div>
                  </div>


                  {error && <small style={{ color: "red" }}>{error}</small>}

                  <button
                    className="btn btn-primary w-100 mb-3"
                    type="submit" form="mobilnumberform"
                  >
                    {login_Loading ? <><ButtonLoading /> Send Otp..</> : 'Send OTP'}
                  </button>

                  <button className="btn btn-primary w-100 mb-4">
                    Continue as Guest
                  </button>

                  {/* Social Login */}
                  {/* <div className="d-flex justify-content-center gap-3 mb-4">
                    <button className="btn btn-light border">
                      <FaGoogle className="text-danger fs-4" />
                    </button>
                    <button className="btn btn-light border">
                      <FaFacebook className="text-primary fs-4" />
                    </button>
                  </div> */}
                </>
              ) : (
                <>
                  {/* OTP UI */}
                  <h4 className="fw-bold mb-2">Enter OTP</h4>
                  {/* <div className="input-group mb-3"> */}
                  <form onSubmit={Verifyuser} id="Verifyuserform">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </form>

                  {/* </div> */}
                  {isFirstDone && (
                    <div className="form-check mb-3">
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

                  <button type="submit" className="btn btn-primary w-100 mb-3 mt-3" form="Verifyuserform"
                    disabled={!isAccepted || login_Loading}>{login_Loading ? <> <ButtonLoading /> Verify OTP.. </> : 'Verify OTP'}</button>

                  {/* Checkbox if is_first_done true */}
                </>
              )}

              {/* Terms */}
              <p className="small text-muted mb-2">
                By continuing, you agree to{" "}
                <a
                  href="#"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Terms of Service
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Privacy Policy
                </a>
                .
              </p>

              {/* Partner Login Link */}
              <a
                href="#"
                className="text-primary fw-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPartnerLogin(true);
                }}
              >
                <i className="fas fa-user-shield me-2"></i> Partners Login
              </a>
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
