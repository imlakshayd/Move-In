
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate(); 

  return (
    <div className="page">
      <Navbar />

      {/* HERO */}
      <header className="hero">
        <div className="container heroInner">
          <p className="heroKicker">Moving Made Simple</p>

          <h1 className="heroTitle">
            Connect with trusted truck owners and moving vendors in your area.
            Compare prices, read reviews, and book with confidence.
          </h1>

          <div className="searchRow">
            <input
              className="searchInput"
              placeholder="Search trucks, movers, or services..."
              aria-label="Search trucks, movers, or services"
            />
            <button className="searchBtn" type="button">
              Search
            </button>
          </div>

          <div className="statsRow">
            <Stat value="1,500+" label="Verified Vendors" />
            <Stat value="50K+" label="Successful Moves" />
            <Stat value="4.8★" label="Average Rating" />
          </div>
        </div>
      </header>

      {/* WHY CHOOSE */}
      <section className="section">
        <div className="container centerText">
          <h2 className="sectionTitle">Why Choose Move-In?</h2>
          <p className="sectionSubtitle">
            The trusted platform for peer-to-peer moving services
          </p>

          <div className="cardGrid">
            <FeatureCard
              icon="🛡️"
              title="Verified & Insured"
              text="All vendors are verified and insured for your peace of mind."
            />
            <FeatureCard
              icon="📈"
              title="Transparent Pricing"
              text="No hidden fees. Compare options with clear pricing."
            />
            <FeatureCard
              icon="⏱️"
              title="Real-Time Availability"
              text="See availability and book instantly with confidence."
            />
          </div>
        </div>
      </section>

      {/* FEATURED VENDORS */}
      <section className="section">
        <div className="container">
          <div className="rowBetween">
            <div>
              <h2 className="sectionTitle left">Featured Vendors</h2>
              <p className="sectionSubtitle left">Top-rated movers in your area</p>
            </div>

           
            <button
              className="ghostBtn"
              type="button"
              onClick={() => navigate("/listings")}
            >
              View All
            </button>
          </div>

          <div className="vendorGrid">
            <VendorCard
              id="swift"
              name="Swift Movers LLC"
              price="$89/hr"
              rating="4.9"
              reviews="342"
              location="Truck • Los Angeles, CA"
              tags={["Verified"]}
            />
            <VendorCard
              id="pro"
              name="Pro Transport Co."
              price="$75/hr"
              rating="4.8"
              reviews="256"
              location="Cargo Van • San Diego, CA"
              tags={["Verified"]}
            />
            <VendorCard
              id="city"
              name="City Haulers"
              price="$95/hr"
              rating="4.7"
              reviews="189"
              location="Moving Truck • San Francisco, CA"
              tags={["Verified"]}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container centerText">
          <h2 className="sectionTitle">What Our Users Say</h2>
          <p className="sectionSubtitle">
            Trusted by thousands of customers and vendors
          </p>

          <div className="cardGrid">
            <Testimonial
              quote="Move-In made my relocation so easy! Found a verified mover within minutes, and the pricing was transparent from start to finish."
              name="Sarah Johnson"
              role="Customer"
            />
            <Testimonial
              quote="As an independent truck owner, Move-In helped me grow my bookings. The platform is easy to use and brings quality customers."
              name="Michael Chen"
              role="Truck Owner"
            />
            <Testimonial
              quote="Best moving experience I’ve had! The vendor was professional, on time, and the clear pricing gave me peace of mind."
              name="Emily Rodriguez"
              role="Customer"
            />
          </div>
        </div>
      </section>

     
      <section className="ctaBanner">
        <div className="container ctaBannerInner">
          <p className="ctaSmall">Ready to Get Started?</p>
          <p className="ctaBig">
            Whether you're looking to move or grow your moving business, we're here to help.
          </p>

          <div className="ctaActions">
            <button className="ctaActionBtn" type="button">
              🔎&nbsp; Book a Move
            </button>
            <button className="ctaActionBtn" type="button">
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      
      <section className="howSection">
        <div className="container centerText">
          <h2 className="howTitle">How It Works</h2>
          <p className="howSub">Get moving in three simple steps</p>

          <div className="howGrid">
            <HowStep
              num="1"
              title="Search & Compare"
              text="Browse verified movers, compare prices, and check availability in real-time"
              variant="green"
            />
            <HowStep
              num="2"
              title="Book & Pay Securely"
              text="Select your preferred vendor and complete your booking with secure payment"
              variant="blue"
            />
            <HowStep
              num="3"
              title="Move with Confidence"
              text="Track your move in real-time and rate your experience when complete"
              variant="green"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ---------- helper components ---------- */

function Stat({ value, label }) {
  return (
    <div className="stat">
      <div className="statValue">{value}</div>
      <div className="statLabel">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="card featureCard">
      <div className="iconCircle" aria-hidden="true">
        {icon}
      </div>
      <h3 className="cardTitle">{title}</h3>
      <p className="cardText">{text}</p>
    </div>
  );
}

function VendorCard({ id, name, price, rating, reviews, location, tags = [] }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="vendorCard vendorCardClickable"
      onClick={() => navigate(`/vendor/${id}`)}
    >
      <div className="vendorImg" aria-hidden="true">
        🚚
      </div>

      <div className="vendorBody">
        <div className="vendorTop">
          <div className="vendorName">{name}</div>
          <div className="vendorPrice">{price}</div>
        </div>

        <div className="tagRow">
          {tags.map((t) => (
            <span className="tagPill" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="vendorMeta">
          <span className="stars" aria-hidden="true">★</span>
          <span className="rating">{rating}</span>
          <span className="muted">({reviews})</span>
        </div>

        <div className="vendorLocation">{location}</div>
      </div>
    </button>
  );
}

function Testimonial({ quote, name, role }) {
  return (
    <div className="card testimonialCard">
      <div className="starsText">★★★★★</div>
      <p className="quote">“{quote}”</p>
      <div className="personName">{name}</div>
      <div className="personRole">{role}</div>
    </div>
  );
}

function HowStep({ num, title, text, variant = "green" }) {
  return (
    <div className="howStep">
      <div className={`howNum ${variant === "blue" ? "howNumBlue" : "howNumGreen"}`}>
        {num}
      </div>
      <div className="howStepTitle">{title}</div>
      <div className="howStepText">{text}</div>
    </div>
  );
}
