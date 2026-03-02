import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import "./Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts: 4165551234, 416-555-1234, (416) 555-1234, +1 416 555 1234
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

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

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear only that field's error while typing
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  function validate(values) {
    const next = {};

    // Required fields
    if (!values.name.trim()) next.name = "Full name is required.";
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    if (!values.email.trim()) next.email = "Email address is required.";
    if (!values.password) next.password = "Password is required.";
    if (!values.confirmPassword) next.confirmPassword = "Confirm your password.";

    // Email format
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = "Please enter a valid email (example: you@example.com).";
    }

    // Phone format
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) {
      next.phone =
        "Please enter a valid phone number (7–15 chars, can include +, (), -).";
    }

    // Password length
    if (values.password && values.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    // Confirm password matches
    if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      next.confirmPassword = "Passwords do not match.";
    }

    // Agree
    if (!values.agree) {
      next.agree = "You must agree to the Terms and Privacy Policy.";
    }

    return next;
  }

  // this is fine to keep (optional)
  const canSubmit = useMemo(() => {
    const v = validate(form);
    return Object.keys(v).length === 0;
  }, [form]);

  function scrollToFirstError(v) {
    const firstKey = Object.keys(v)[0];
    if (!firstKey) return;
    const el = document.querySelector(`[name="${firstKey}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const v = validate(form);
    setErrors(v);

    if (Object.keys(v).length > 0) {
      scrollToFirstError(v);
      return;
    }

    alert(`Account created as ${accountType}`);
    navigate("/signin");
  }

  const fieldClass = (key) => `authInput ${errors[key] ? "inputError" : ""}`;

  return (
    <div className="authPage">
      <Navbar />

      <main className="authMain">
        <form className="authCard authWide" onSubmit={handleSubmit} noValidate>
          <h1 className="authTitle">Create Your Account</h1>
          <p className="authSubtitle">Join Move-In and start your journey</p>

          {/* ✅ Global error summary */}
          {Object.keys(errors).length > 0 && (
            <div className="formErrorBox" role="alert" aria-live="polite">
              <strong>Please fix the following:</strong>
              <ul>
                {Object.entries(errors).map(([key, msg]) => (
                  <li key={key}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

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
                <span className="inputIcon" aria-hidden="true">
                  👤
                </span>
                <input
                  className={fieldClass("name")}
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
              </div>
              {errors.name && <div className="fieldError">{errors.name}</div>}
            </div>

            <div>
              <label className="fieldLabel">Phone Number</label>
              <div className="inputWrap">
                <span className="inputIcon" aria-hidden="true">
                  📞
                </span>
                <input
                  className={fieldClass("phone")}
                  name="phone"
                  placeholder="(416) 555-1234"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                />
              </div>
              {errors.phone && <div className="fieldError">{errors.phone}</div>}
            </div>
          </div>

          {/* EMAIL */}
          <label className="fieldLabel">Email Address</label>
          <div className="inputWrap">
            <span className="inputIcon" aria-hidden="true">
              📧
            </span>
            <input
              className={fieldClass("email")}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
            />
          </div>
          {errors.email && <div className="fieldError">{errors.email}</div>}

          {/* PASSWORD */}
          <label className="fieldLabel">Password</label>
          <div className="inputWrap">
            <span className="inputIcon" aria-hidden="true">
              🔒
            </span>
            <input
              className={fieldClass("password")}
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
            />
          </div>
          {errors.password && <div className="fieldError">{errors.password}</div>}

          {/* CONFIRM */}
          <label className="fieldLabel">Confirm Password</label>
          <div className="inputWrap">
            <span className="inputIcon" aria-hidden="true">
              🔒
            </span>
            <input
              className={fieldClass("confirmPassword")}
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
              autoComplete="new-password"
            />
          </div>
          {errors.confirmPassword && (
            <div className="fieldError">{errors.confirmPassword}</div>
          )}

          {/* TERMS */}
          <div className="rememberRow">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              aria-invalid={Boolean(errors.agree)}
            />
            <span>
              I agree to the <span className="linkInlineBtn">Terms of Service</span>{" "}
              and <span className="linkInlineBtn">Privacy Policy</span>
            </span>
          </div>
          {errors.agree && <div className="fieldError">{errors.agree}</div>}

          {/* ✅ IMPORTANT: do NOT disable this button */}
          <button className="authBtn" type="submit">
            Create Account
          </button>

          {/* Optional: if you want to visually show it’s not ready, but still clickable */}
          {!canSubmit && (
            <div className="muted" style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
              Fill all fields correctly to create your account.
            </div>
          )}

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
