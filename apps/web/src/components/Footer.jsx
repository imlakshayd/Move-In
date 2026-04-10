import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mi-footer">
      <div className="mi-footer__container">
        <div className="mi-footer__brand">
          <div className="mi-footer__logo">
            <span className="mi-footer__truck" aria-hidden="true">🚚</span>
            <span className="mi-footer__name">Move-In</span>
          </div>

          <p className="mi-footer__desc">
            Connecting you with trusted moving services
            <br />
            and independent truck owners.
          </p>

          <div className="mi-footer__social">
            <IconBtn label="Facebook" onClick={() => window.open("https://facebook.com", "_blank")} />
            <IconBtn label="Twitter" onClick={() => window.open("https://twitter.com", "_blank")} />
            <IconBtn label="Instagram" onClick={() => window.open("https://instagram.com", "_blank")} />
            <IconBtn label="LinkedIn" onClick={() => window.open("https://linkedin.com", "_blank")} />
            <IconBtn label="Email" onClick={() => navigate("/contact")} />
          </div>
        </div>

        <div className="mi-footer__col">
          <div className="mi-footer__title">Company</div>
          <Link className="mi-footer__link" to="/about">About Us</Link>
          <Link className="mi-footer__link" to="/contact">Contact</Link>
          <Link className="mi-footer__link" to="/careers">Careers</Link>
          <Link className="mi-footer__link" to="/press">Press</Link>
        </div>

        <div className="mi-footer__col">
          <div className="mi-footer__title">Support</div>
          <Link className="mi-footer__link" to="/faqs">FAQs</Link>
          <Link className="mi-footer__link" to="/help-center">Help Center</Link>
          <Link className="mi-footer__link" to="/safety-guidelines">Safety Guidelines</Link>
          <Link className="mi-footer__link" to="/insurance-info">Insurance Info</Link>
        </div>

        <div className="mi-footer__col">
          <div className="mi-footer__title">Legal</div>
          <Link className="mi-footer__link" to="/terms">Terms of Service</Link>
          <Link className="mi-footer__link" to="/privacy">Privacy Policy</Link>
          <Link className="mi-footer__link" to="/cookies">Cookie Policy</Link>
          <Link className="mi-footer__link" to="/accessibility">Accessibility</Link>
        </div>
      </div>

      <div className="mi-footer__bottom">
        © 2026 Move-In. All rights reserved.
      </div>
    </footer>
  );
}

function IconBtn({ label, onClick }) {
  return (
    <button
      className="mi-footer__icon"
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <span aria-hidden="true">•</span>
    </button>
  );
}