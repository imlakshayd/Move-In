import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./BookingPage.css";

const VENDORS = [
  {
    id: "swift",
    name: "Swift Movers LLC",
    price: 89,
    rating: 4.9,
    reviews: 342,
    vehicleType: "Box Truck",
    location: "Los Angeles, CA",
    verified: true,
    insurance: "Full Coverage ($1M)",
    minimumHours: 2,
  },
  {
    id: "pro",
    name: "Pro Transport Co.",
    price: 75,
    rating: 4.8,
    reviews: 256,
    vehicleType: "Cargo Van",
    location: "San Diego, CA",
    verified: true,
    insurance: "Basic Coverage ($500K)",
    minimumHours: 3,
  },
  {
    id: "city",
    name: "City Haulers",
    price: 95,
    rating: 4.7,
    reviews: 189,
    vehicleType: "Moving Truck",
    location: "San Francisco, CA",
    verified: true,
    insurance: "Full Coverage ($1M)",
    minimumHours: 2,
  },
  {
    id: "quick",
    name: "Quick Move Services",
    price: 65,
    rating: 4.6,
    reviews: 145,
    vehicleType: "Pickup Truck",
    location: "Los Angeles, CA",
    verified: true,
    insurance: "Basic Coverage ($250K)",
    minimumHours: 2,
  },
  {
    id: "elite",
    name: "Elite Moving Solutions",
    price: 120,
    rating: 4.9,
    reviews: 412,
    vehicleType: "Box Truck",
    location: "San Francisco, CA",
    verified: true,
    insurance: "Full Coverage ($2M)",
    minimumHours: 4,
  },
  {
    id: "budget",
    name: "Budget Movers",
    price: 55,
    rating: 4.5,
    reviews: 98,
    vehicleType: "Cargo Van",
    location: "San Diego, CA",
    verified: false,
    insurance: "Basic Coverage ($250K)",
    minimumHours: 2,
  },
];

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toISOString().slice(0, 10);
  } catch {
    return dateStr;
  }
}

function makeBookingId() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `#${out}`;
}

export default function BookingPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const vendor = useMemo(() => VENDORS.find((v) => v.id === vendorId), [vendorId]);

  const [step, setStep] = useState(0);

  // Step 0
  const [moveDate, setMoveDate] = useState("");
  const [hours, setHours] = useState(vendor?.minimumHours || 2);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [notes, setNotes] = useState("");

  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createAccount, setCreateAccount] = useState(false);

  // Step 2
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [billingZip, setBillingZip] = useState("");

  // Step 3 data
  const [bookingId, setBookingId] = useState("");
  const [confirmedAt, setConfirmedAt] = useState("");

  const base = useMemo(() => {
    if (!vendor) return 0;
    const h = Math.max(Number(hours) || 0, vendor.minimumHours || 0);
    return vendor.price * h;
  }, [vendor, hours]);

  const insuranceFee = useMemo(() => {
    if (!vendor) return 0;
    return vendor.insurance.includes("$2M") ? 25 : vendor.insurance.includes("$1M") ? 15 : 10;
  }, [vendor]);

  const serviceFee = 12.0;
  const taxRate = 0.08;

  const tax = useMemo(() => (base + insuranceFee + serviceFee) * taxRate, [base, insuranceFee]);
  const total = useMemo(() => base + insuranceFee + serviceFee + tax, [base, insuranceFee, tax]);

  if (!vendor) {
    return (
      <div className="bookPage">
        <Navbar />
        <div className="bookShell">
          <div className="bookTop">
            <h1>Booking</h1>
            <p className="muted">Vendor not found.</p>
          </div>
          <button className="btnLight" type="button" onClick={() => navigate("/listings")}>
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const stepTitles = ["Date & Details", "Contact Info", "Payment", "Confirmation"];

  const canContinue = () => {
    if (step === 0) return Boolean(moveDate) && pickup.trim() && dropoff.trim();
    if (step === 1) return fullName.trim() && email.trim() && phone.trim();
    if (step === 2) return cardNumber.trim() && exp.trim() && cvc.trim() && billingZip.trim();
    return true;
  };

  const goNext = () => {
    if (!canContinue()) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    if (!bookingId) setBookingId(makeBookingId());
    if (!confirmedAt) setConfirmedAt(new Date().toISOString());
    setStep(3);
  };

  const hoursUsed = Math.max(Number(hours) || 0, vendor.minimumHours);
  const bookingDate = moveDate ? formatDate(moveDate) : "Select a date";

  // ✅ add handlers (optional)
  const openTerms = () => navigate("/terms");
  const openPrivacy = () => navigate("/privacy");

  return (
    <div className="bookPage">
      <Navbar />

      <div className="bookShell">
        <div className="stepper">
          {stepTitles.map((t, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <div className="step" key={t}>
                <div className={`dot ${active ? "dotActive" : ""} ${done ? "dotDone" : ""}`}>
                  {done ? "✓" : i + 1}
                </div>
                <div className={`stepLabel ${active ? "stepLabelActive" : ""}`}>{t}</div>
                {i !== stepTitles.length - 1 && <div className={`line ${done ? "lineDone" : ""}`} />}
              </div>
            );
          })}
        </div>

        <div className="bookGrid">
          <div className="cardMain">
            {step === 0 && (
              <>
                <div className="cardTitle">Date &amp; Details</div>

                <div className="field">
                  <label>Move Date</label>
                  <input type="date" value={moveDate} onChange={(e) => setMoveDate(e.target.value)} />
                </div>

                <div className="field">
                  <label>Estimated Hours</label>
                  <input
                    type="number"
                    min={vendor.minimumHours}
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                  <div className="hint">Minimum {vendor.minimumHours} hours required</div>
                </div>

                <div className="field">
                  <label>Pickup Address</label>
                  <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter pickup address" />
                </div>

                <div className="field">
                  <label>Drop-off Address</label>
                  <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="Enter drop-off address" />
                </div>

                <div className="field">
                  <label>Additional Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions, items that need extra care, parking details, etc."
                  />
                </div>

                <div className="infoBox">
                  <span className="infoIcon">ⓘ</span>
                  <div>
                    Service is available from <b>8:00 AM</b> to <b>6:00 PM</b>. We’ll contact you to confirm the exact time.
                  </div>
                </div>

                <div className="actionsRow">
                  <button className="btnLight" type="button" onClick={() => navigate(-1)}>
                    Back
                  </button>
                  <button
                    className={`btnPrimary ${!canContinue() ? "btnDisabled" : ""}`}
                    type="button"
                    onClick={goNext}
                    disabled={!canContinue()}
                  >
                    Continue <span className="arrow">›</span>
                  </button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="cardTitle">Contact Info</div>

                <div className="field">
                  <label>Full Name</label>
                  <div className="inputWithIcon">
                    <span className="leftIcon" aria-hidden="true">👤</span>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
                  </div>
                </div>

                <div className="field">
                  <label>Email Address</label>
                  <div className="inputWithIcon">
                    <span className="leftIcon" aria-hidden="true">✉️</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="field">
                  <label>Phone Number</label>
                  <div className="inputWithIcon">
                    <span className="leftIcon" aria-hidden="true">📞</span>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="checkCard">
                  <label className="checkRow">
                    <input type="checkbox" checked={createAccount} onChange={(e) => setCreateAccount(e.target.checked)} />
                    <div className="checkText">
                      <div className="checkTitle">Create an account for faster bookings</div>
                      <div className="checkSub">Save your details and track your bookings</div>
                    </div>
                  </label>
                </div>

                <div className="noteCard">
                  <span className="noteIcon" aria-hidden="true">✉️</span>
                  <div>We’ll send booking confirmation and updates to your email and phone.</div>
                </div>

                <div className="actionsRow">
                  <button className="btnLight" type="button" onClick={goBack}>
                    Back
                  </button>
                  <button
                    className={`btnPrimary ${!canContinue() ? "btnDisabled" : ""}`}
                    type="button"
                    onClick={goNext}
                    disabled={!canContinue()}
                  >
                    Continue <span className="arrow">›</span>
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="cardTitle">Payment</div>

                <div className="secureRow">
                  <span className="secureDot" aria-hidden="true">✓</span>
                  <span className="secureText">Secure payment powered by Stripe</span>
                </div>

                <div className="field">
                  <label>Card Number</label>
                  <div className="inputWithIcon">
                    <span className="leftIcon" aria-hidden="true">💳</span>
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                </div>

                <div className="fieldRow">
                  <div className="field">
                    <label>Expiry Date</label>
                    <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" />
                  </div>
                  <div className="field">
                    <label>CVV</label>
                    <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" />
                  </div>
                </div>

                <div className="field">
                  <label>ZIP Code</label>
                  <input value={billingZip} onChange={(e) => setBillingZip(e.target.value)} placeholder="90210" />
                </div>

                <div className="includesBox">
                  <div className="includesHead">
                    <span className="includesIcon" aria-hidden="true">✓</span>
                    <span>Your booking includes:</span>
                  </div>
                  <ul className="includesList">
                    <li>Full insurance coverage up to $1M</li>
                    <li>Professional moving equipment</li>
                    <li>Free cancellation up to 24 hours before</li>
                    <li>Real-time tracking and support</li>
                  </ul>
                </div>

                {/* ✅ FIXED: no <a href="#"> */}
                <div className="termsText">
                  By confirming your booking, you agree to Move-In’s{" "}
                  <button type="button" className="linkInlineBtn" onClick={openTerms}>
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="linkInlineBtn" onClick={openPrivacy}>
                    Privacy Policy
                  </button>
                  .
                </div>

                <div className="actionsRow payActions">
                  <button className="btnLight wideBtn" type="button" onClick={goBack}>
                    Back
                  </button>
                  <button
                    className={`btnPrimary wideBtn ${!canContinue() ? "btnDisabled" : ""}`}
                    type="button"
                    onClick={finish}
                    disabled={!canContinue()}
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="cardTitle">Confirmation</div>

                <div className="confirmPanel">
                  <div className="confirmIcon">✓</div>
                  <div className="confirmHeading">Booking Confirmed!</div>
                  <div className="confirmSub">
                    Your booking has been successfully confirmed. We’ve sent a confirmation email to{" "}
                    <b>{email || "your email"}</b>.
                  </div>

                  <div className="detailsCard">
                    <div className="detailsTitle">Booking Details</div>

                    <div className="detailsGrid">
                      <div className="detailsRow">
                        <span className="detailsLabel">Booking ID:</span>
                        <span className="detailsValue">{bookingId || "#--------"}</span>
                      </div>

                      <div className="detailsRow">
                        <span className="detailsLabel">Service:</span>
                        <span className="detailsValue">{vendor.name}</span>
                      </div>

                      <div className="detailsRow">
                        <span className="detailsLabel">Date:</span>
                        <span className="detailsValue">{bookingDate || "—"}</span>
                      </div>

                      <div className="detailsRow">
                        <span className="detailsLabel">Duration:</span>
                        <span className="detailsValue">{hoursUsed} hours</span>
                      </div>

                      <div className="detailsRow detailsRowWide">
                        <span className="detailsLabel">Pickup:</span>
                        <span className="detailsValue">{pickup || "—"}</span>
                      </div>

                      <div className="detailsRow detailsRowWide">
                        <span className="detailsLabel">Drop-off:</span>
                        <span className="detailsValue">{dropoff || "—"}</span>
                      </div>

                      {notes?.trim() ? (
                        <div className="detailsRow detailsRowWide">
                          <span className="detailsLabel">Notes:</span>
                          <span className="detailsValue">{notes}</span>
                        </div>
                      ) : null}

                      <div className="detailsRow totalPaid">
                        <span className="detailsLabel">Total Paid:</span>
                        <span className="detailsValue">{money(total)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="btnPrimary fullBtn" type="button" onClick={() => navigate("/customer")}>
                    View My Bookings
                  </button>

                  <button className="btnLight fullBtn" type="button" onClick={() => navigate("/")}>
                    Back to Home
                  </button>

                  <div className="smsNote">
                    <span className="smsIcon" aria-hidden="true">✉️</span>
                    <span>
                      You’ll receive an SMS confirmation shortly with the vendor’s contact details and tracking information.
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <aside className="cardSide">
            <div className="sideTitle">Booking Summary</div>

            <div className="vendorMini">
              <div className="miniIcon">🚚</div>
              <div>
                <div className="miniName">{vendor.name}</div>
                {vendor.verified && <div className="miniBadge">✓ Verified</div>}
              </div>
            </div>

            <div className="divider" />

            <div className="lineItem">
              <span>Base rate ({hoursUsed}h)</span>
              <span>{money(base)}</span>
            </div>

            <div className="lineItem">
              <span>Insurance</span>
              <span>{money(insuranceFee)}</span>
            </div>

            <div className="lineItem">
              <span>Service fee</span>
              <span>{money(serviceFee)}</span>
            </div>

            <div className="lineItem">
              <span>Tax (8%)</span>
              <span>{money(tax)}</span>
            </div>

            <div className="divider" />

            <div className="totalRow">
              <span>Total</span>
              <span className="total">{money(total)}</span>
            </div>

            <div className="sideMeta">
              <div className="sideMetaRow">
                <span className="sideMetaIcon" aria-hidden="true">📅</span>
                <span>{bookingDate}</span>
              </div>
              <div className="sideMetaRow">
                <span className="sideMetaIcon" aria-hidden="true">📍</span>
                <span>{pickup ? pickup : "Enter pickup address"}</span>
              </div>
            </div>

            <div className="sideHint">You won’t be charged until booking is confirmed.</div>
          </aside>
        </div>
      </div>
    </div>
  );
}
