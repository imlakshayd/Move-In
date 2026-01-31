import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="mi-footer">
      <div className="mi-footer__container">
        {/* Left brand column */}
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
            <IconBtn label="Facebook" />
            <IconBtn label="Twitter" />
            <IconBtn label="Instagram" />
            <IconBtn label="LinkedIn" />
            <IconBtn label="Email" />
          </div>
        </div>

        {/* Company */}
        <div className="mi-footer__col">
          <div className="mi-footer__title">Company</div>
          <a className="mi-footer__link" href="#about">About Us</a>
          <a className="mi-footer__link" href="#contact">Contact</a>
          <a className="mi-footer__link" href="#careers">Careers</a>
          <a className="mi-footer__link" href="#press">Press</a>
        </div>

        {/* Support */}
        <div className="mi-footer__col">
          <div className="mi-footer__title">Support</div>
          <a className="mi-footer__link" href="#faqs">FAQs</a>
          <a className="mi-footer__link" href="#help">Help Center</a>
          <a className="mi-footer__link" href="#safety">Safety Guidelines</a>
          <a className="mi-footer__link" href="#insurance">Insurance Info</a>
        </div>

        {/* Legal */}
        <div className="mi-footer__col">
          <div className="mi-footer__title">Legal</div>
          <a className="mi-footer__link" href="#tos">Terms of Service</a>
          <a className="mi-footer__link" href="#privacy">Privacy Policy</a>
          <a className="mi-footer__link" href="#cookies">Cookie Policy</a>
          <a className="mi-footer__link" href="#accessibility">Accessibility</a>
        </div>
      </div>

      <div className="mi-footer__bottom">
        © 2026 Move-In. All rights reserved.
      </div>
    </footer>
  );
}


function IconBtn({ label }) {
  return (
    <button className="mi-footer__icon" type="button" aria-label={label} title={label}>
      {/* simple dot icon to keep it clean; you can replace with svg later */}
      <span aria-hidden="true">•</span>
    </button>
  );
}
