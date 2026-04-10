import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Auth.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false); // ✅ show errors after first submit click


  const handleQuickRole = (r) => {
    setRole(r);
    if (r === "vendor") {
      setEmail("vendor@example.com");
      setPassword("vendor123");
    } else if (r === "customer") {
      setEmail("customer@example.com");
      setPassword("customer123");
    } else if (r === "support") {
      setEmail("support@example.com");
      setPassword("support123");
    } else if (r === "admin") {
      setEmail("admin@example.com");
      setPassword("admin123");
    }
  };

  function validate(values) {
    const next = {};

    const cleanEmail = values.email.trim();
    if (!cleanEmail) {
      next.email = "Email is required.";
    } else if (!EMAIL_RE.test(cleanEmail)) {
      next.email = "Please enter a valid email (you@example.com).";
    }

    const cleanPassword = values.password.trim();
    if (!cleanPassword) {
      next.password = "Password is required.";
    } else if (cleanPassword.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    return next;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAttempted(true);

    const v = validate({ email, password, role });
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      const user = await login(email, password);
      // Backend validates that user successfully logged in

      // ✅ Redirect
      const target =
        user.role === "REGISTERED_USER"
          ? "/customer"
          : user.role === "VENDOR"
            ? "/list-your-truck"
            : "/";

      navigate(target, { replace: true });
    } catch (err) {
      setErrors({ form: err.message || "Failed to sign in. Please check your credentials." });
    }
  };

  const fieldClass = (key) => `authInput ${errors[key] ? "inputError" : ""}`;

  return (
    <div className="authPage">
      <Navbar />

      <main className="authMain">
        <form className="authCard" onSubmit={handleSignIn} noValidate>
          <h1 className="authTitle">Welcome Back</h1>
          <p className="authSubtitle">Sign in to your Move-In account</p>

          {/* ✅ Global error summary (shows after clicking Sign In) */}
          {attempted && Object.keys(errors).length > 0 && (
            <div className="formErrorBox" role="alert" aria-live="polite">
              <strong>Please fix the following:</strong>
              <ul>
                {Object.entries(errors).map(([key, msg], i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Email */}
          <label className="fieldLabel">Email Address</label>
          <div className="inputWrap">
            <span className="inputIcon" aria-hidden="true">
              📧
            </span>
            <input
              className={fieldClass("email")}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // clear email error while typing
                setErrors((prev) => {
                  if (!prev.email) return prev;
                  const copy = { ...prev };
                  delete copy.email;
                  return copy;
                });
              }}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
          </div>
          {attempted && errors.email && (
            <div className="fieldError">{errors.email}</div>
          )}

          {/* Password */}
          <div className="rowBetweenAuth">
            <label className="fieldLabel">Password</label>
            <button
              className="linkSmall"
              type="button"
              onClick={() => alert("Coming soon!")}
            >
              Forgot password?
            </button>
          </div>

          <div className="inputWrap">
            <span className="inputIcon" aria-hidden="true">
              🔒
            </span>
            <input
              className={fieldClass("password")}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // clear password error while typing
                setErrors((prev) => {
                  if (!prev.password) return prev;
                  const copy = { ...prev };
                  delete copy.password;
                  return copy;
                });
              }}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
            />
          </div>
          {attempted && errors.password && (
            <div className="fieldError">{errors.password}</div>
          )}

          {/* Remember me */}
          <div className="rememberRow">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* ✅ IMPORTANT: button is NOT disabled anymore */}
          <button className="authBtn" type="submit">
            Sign In
          </button>

          {/* Quick login / Remove mock role */}
          <div className="quickGrid">
            <button
              type="button"
              className={`quickBtn ${role === "customer" ? "quickBtnActive" : ""}`}
              onClick={() => handleQuickRole("customer")}
            >
              Customer
            </button>
            <button
              type="button"
              className={`quickBtn ${role === "vendor" ? "quickBtnActive" : ""}`}
              onClick={() => handleQuickRole("vendor")}
            >
              Vendor
            </button>
            <button
              type="button"
              className={`quickBtn ${role === "support" ? "quickBtnActive" : ""}`}
              onClick={() => handleQuickRole("support")}
            >
              Support
            </button>
            <button
              type="button"
              className={`quickBtn ${role === "admin" ? "quickBtnActive" : ""}`}
              onClick={() => handleQuickRole("admin")}
            >
              Admin
            </button>
          </div>

          {/* Bottom */}
          <div className="authBottom">
            Don’t have an account?{" "}
            <Link className="linkInline" to="/signup">
              Sign up
            </Link>
          </div>

          <div className="authFinePrint">
            By signing in, you agree to our{" "}
            <span className="linkInlineBtn">Terms of Service</span> and{" "}
            <span className="linkInlineBtn">Privacy Policy</span>.
          </div>
        </form>
      </main>
    </div>
  );
}
