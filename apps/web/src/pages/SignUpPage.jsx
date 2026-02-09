import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Auth.css";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("customer"); // customer | vendor

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.agree) {
      alert("You must agree to the Terms and Privacy Policy.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // 🔒 Later: call backend API
    alert(`Account created as ${accountType}`);

    navigate("/signin");
  }

  return (
    <div className="authPage">
      <Navbar />

      <main className="authMain">
        <form className="authCard authWide" onSubmit={handleSubmit}>
          <h1 className="authTitle">Create Your Account</h1>
          <p className="authSubtitle">
            Join Move-In and start your journey
          </p>

          {/* SEGMENTED SWITCH */}
          <div className="segmented">
            <button
              type="button"
              className={`segmentBtn ${
                accountType === "customer" ? "segmentBtnActive" : ""
              }`}
              onClick={() => setAccountType("customer")}
            >
              I need moving services
            </button>

            <button
              type="button"
              className={`segmentBtn ${
                accountType === "vendor" ? "segmentBtnActive" : ""
              }`}
              onClick={() => setAccountType("vendor")}
            >
              I'm a truck owner/vendor
            </button>
          </div>

          {/* NAME + PHONE */}
          <div className="twoCol">
            <div>
              <label className="fieldLabel">Full Name</label>
              <div className="inputWrap">
                <span className="inputIcon">👤</span>
                <input
                  className="authInput"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="fieldLabel">Phone Number</label>
              <div className="inputWrap">
                <span className="inputIcon">📞</span>
                <input
                  className="authInput"
                  name="phone"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <label className="fieldLabel">Email Address</label>
          <div className="inputWrap">
            <span className="inputIcon">📧</span>
            <input
              className="authInput"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <label className="fieldLabel">Password</label>
          <div className="inputWrap">
            <span className="inputIcon">🔒</span>
            <input
              className="authInput"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* CONFIRM */}
          <label className="fieldLabel">Confirm Password</label>
          <div className="inputWrap">
            <span className="inputIcon">🔒</span>
            <input
              className="authInput"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* TERMS */}
          <div className="rememberRow">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span>
              I agree to the{" "}
              <span className="linkInlineBtn">Terms of Service</span> and{" "}
              <span className="linkInlineBtn">Privacy Policy</span>
            </span>
          </div>

          <button className="authBtn" type="submit">
            Create Account
          </button>

          <div className="authBottom">
            Already have an account?{" "}
            <Link className="linkInline" to="/signin">
              Sign in
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

