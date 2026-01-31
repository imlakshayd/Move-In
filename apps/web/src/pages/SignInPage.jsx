import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Auth.css";

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // roles: customer | vendor | support | admin
  const [role, setRole] = useState("");

  function handleQuickRole(selectedRole) {
    setRole(selectedRole);
  }

  function handleSignIn(e) {
    e.preventDefault();

    if (!role) {
      alert("Please select a role first (Customer / Vendor / Support / Admin).");
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    // ✅ TEMP: frontend-only auth (later replace with API login)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("email", email.trim());

    // Optional: store a display name (for dashboard greeting)
    // For now we set a simple one based on email
    const nameGuess = email.split("@")[0] || "Customer";
    localStorage.setItem("fullName", nameGuess);

    // ✅ Redirect based on role
    if (role === "customer") {
      navigate("/customer");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="authPage">
      <Navbar />

      <main className="authMain">
        <form className="authCard" onSubmit={handleSignIn}>
          <h1 className="authTitle">Welcome Back</h1>
          <p className="authSubtitle">Sign in to your Move-In account</p>

          {/* Email */}
          <label className="fieldLabel">Email Address</label>
          <div className="inputWrap">
            <span className="inputIcon">📧</span>
            <input
              className="authInput"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="rowBetweenAuth">
            <label className="fieldLabel">Password</label>
            <button className="linkSmall" type="button">
              Forgot password?
            </button>
          </div>

          <div className="inputWrap">
            <span className="inputIcon">🔒</span>
            <input
              className="authInput"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Remember me */}
          <div className="rememberRow">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Selected role indicator */}
          <div className="roleHint">
            Selected role:{" "}
            <span className={role ? "roleSelected" : "roleMissing"}>
              {role ? role : "None"}
            </span>
          </div>

          {/* Sign in */}
          <button className="authBtn" type="submit">
            Sign In
          </button>

          {/* Quick login */}
          <div className="quickLogin">
            <div className="quickTitle">Quick login as:</div>

            <div className="quickGrid">
              <button
                type="button"
                className={`quickBtn ${
                  role === "customer" ? "quickBtnActive" : ""
                }`}
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
                className={`quickBtn ${
                  role === "support" ? "quickBtnActive" : ""
                }`}
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


