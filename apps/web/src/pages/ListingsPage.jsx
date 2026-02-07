import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ListingsPage.css";

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
    available: true,
    desc: "Professional moving services with 10+ years experience",
    insurance: "Full Coverage ($1M)",
    minimumHours: "2 hours",
    crewSize: "2-3 movers",
    equipment: "Dollies, blankets, straps",
    availabilityNote: "Same-day available",
    cancellationPolicy: "Free up to 24hrs",
    experience: "10+ years",
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
    available: true,
    desc: "Fast and reliable local moving services",
    insurance: "Basic Coverage ($500K)",
    minimumHours: "3 hours",
    crewSize: "1-2 movers",
    equipment: "Dollies, blankets",
    availabilityNote: "Next-day available",
    cancellationPolicy: "Free up to 48hrs",
    experience: "5+ years",
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
    available: true,
    desc: "Full-service moving with packing assistance",
    insurance: "Full Coverage ($1M)",
    minimumHours: "2 hours",
    crewSize: "3-4 movers",
    equipment: "Dollies, blankets, straps, tools",
    availabilityNote: "2 days ahead",
    cancellationPolicy: "Free up to 24hrs",
    experience: "8+ years",
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
    available: true,
    desc: "Budget-friendly moving for small loads",
    insurance: "Basic Coverage ($250K)",
    minimumHours: "2 hours",
    crewSize: "1-2 movers",
    equipment: "Blankets",
    availabilityNote: "Same-day available",
    cancellationPolicy: "Free up to 12hrs",
    experience: "3+ years",
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
    available: false,
    desc: "Premium moving services with white-glove care",
    insurance: "Full Coverage ($2M)",
    minimumHours: "4 hours",
    crewSize: "4-6 movers",
    equipment: "Full kit + specialty tools",
    availabilityNote: "Limited schedule",
    cancellationPolicy: "Free up to 48hrs",
    experience: "12+ years",
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
    available: true,
    desc: "Affordable moving for students and small apartments",
    insurance: "Basic Coverage ($250K)",
    minimumHours: "2 hours",
    crewSize: "1-2 movers",
    equipment: "Dollies",
    availabilityNote: "Next-day available",
    cancellationPolicy: "Free up to 24hrs",
    experience: "2+ years",
  },
];

const VEHICLE_TYPES = ["Box Truck", "Cargo Van", "Moving Truck", "Pickup Truck"];

function money(n) {
  return `$${Number(n).toFixed(0)}/hr`;
}

export default function ListingsPage() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid"); 
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200);
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("Recommended");
  const [compareIds, setCompareIds] = useState([]);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(VENDORS.map((v) => v.location)));
    return ["all", ...unique];
  }, []);

  const filteredAndSorted = useMemo(() => {
    let arr = VENDORS.filter((v) => {
      const typeOk =
        vehicleTypes.length === 0 || vehicleTypes.includes(v.vehicleType);
      const verifiedOk = !verifiedOnly || v.verified;
      const priceOk = v.price <= maxPrice;
      const locationOk = location === "all" || v.location === location;
      return typeOk && verifiedOk && priceOk && locationOk;
    });

    const sorters = {
      Recommended: (a, b) => {
        const score = (x) =>
          (x.verified ? 2 : 0) + (x.available ? 2 : 0) + x.rating;
        return score(b) - score(a);
      },
      "Price: Low to High": (a, b) => a.price - b.price,
      "Price: High to Low": (a, b) => b.price - a.price,
      "Top Rated": (a, b) => b.rating - a.rating,
      "Most Reviews": (a, b) => b.reviews - a.reviews,
    };

    return [...arr].sort(sorters[sort] || sorters.Recommended);
  }, [vehicleTypes, verifiedOnly, maxPrice, location, sort]);

  
  const compareSelectedVendors = useMemo(() => {
    return compareIds
      .map((id) => VENDORS.find((v) => v.id === id))
      .filter(Boolean);
  }, [compareIds]);

  const toggleVehicleType = (type) => {
    setVehicleTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setVehicleTypes([]);
    setVerifiedOnly(false);
    setMaxPrice(200);
    setLocation("all");
    setSort("Recommended");
    setCompareIds([]);
  };

  const onViewDetails = (vendorId) => navigate(`/vendor/${vendorId}`);

  const onToggleCompare = (vendorId) => {
    setCompareIds((prev) => {
      if (prev.includes(vendorId)) return prev.filter((id) => id !== vendorId);
      if (prev.length >= 3) return prev; 
      return [...prev, vendorId];
    });
  };

  const onCompareNow = () => {
    if (compareSelectedVendors.length < 2) return;
    const query = compareSelectedVendors.map((v) => v.id).join(",");
    navigate(`/compare?ids=${encodeURIComponent(query)}`);
  };

  const removeFromCompare = (vendorId) => {
    setCompareIds((prev) => prev.filter((id) => id !== vendorId));
  };

  return (
    <div className="listPage">
      <Navbar />

      <div className="listWrap">
        <div className="listHeader">
          <div>
            <h1>Browse Moving Services</h1>
            <p>{filteredAndSorted.length} services available</p>
          </div>
        </div>

        <div className="listGrid">
          {/* Filters */}
          <aside className="filters">
            <div className="filtersTop">
              <div className="filtersTitle">Filters</div>
              <button className="miniLink" type="button" onClick={clearFilters}>
                Reset
              </button>
            </div>

            <div className="filterBlock">
              <div className="filterLabel">Vehicle Type</div>
              <div className="checkList">
                {VEHICLE_TYPES.map((t) => (
                  <label key={t} className="checkItem">
                    <input
                      type="checkbox"
                      checked={vehicleTypes.includes(t)}
                      onChange={() => toggleVehicleType(t)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filterBlock">
              <div className="filterLabel">Price Range</div>
              <div className="rangeRow">
                <div className="rangeText">$0 – ${maxPrice}/hr</div>
                <input
                  className="range"
                  type="range"
                  min="0"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="filterBlock">
              <div className="filterLabel">Location</div>
              <select
                className="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="all">All locations</option>
                {locations
                  .filter((x) => x !== "all")
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
            </div>

            <label className="checkItem verifiedOnly">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
              />
              <span>Verified vendors only</span>
            </label>

            <button className="clearBtn" type="button" onClick={clearFilters}>
              Clear All Filters
            </button>
          </aside>

          {/* Results */}
          <main className="results">
            {/* Compare bar */}
            {compareSelectedVendors.length > 0 && (
              <div className="compareBar">
                <div className="compareBarLeft">
                  <strong>{compareSelectedVendors.length}</strong> items selected
                  for comparison{" "}
                  <span className="compareHint">(Select up to 3)</span>
                </div>

                <div className="compareBarRight">
                  <button
                    className={`compareNowBtn ${
                      compareSelectedVendors.length < 2
                        ? "compareNowDisabled"
                        : ""
                    }`}
                    type="button"
                    onClick={onCompareNow}
                    disabled={compareSelectedVendors.length < 2}
                    title={
                      compareSelectedVendors.length < 2
                        ? "Select at least 2 to compare"
                        : "Compare now"
                    }
                  >
                    Compare Now
                  </button>

                  <button
                    className="compareX"
                    type="button"
                    onClick={() => setCompareIds([])}
                    title="Clear"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/*  Compare preview cards  */}
            {compareSelectedVendors.length > 0 && (
              <div className="comparePreview">
                {compareSelectedVendors.map((v) => (
                  <div key={v.id} className="vendorCard2 vendorCardSelected">
                    <div className="imgArea">
                      <div className="truckIcon">🚚</div>
                    </div>

                    <div className="body">
                      <div className="topRow">
                        <div className="name">{v.name}</div>
                        <div className="price">{money(v.price)}</div>
                      </div>

                      <div className="tagRow2">
                        {v.verified && <span className="verifiedTag">Verified</span>}
                      </div>

                      <div className="meta">
                        <span className="star">★</span>
                        <span>{v.rating}</span>
                        <span className="muted">({v.reviews} reviews)</span>
                      </div>

                      <div className="submeta">
                        <div>🚚 {v.vehicleType}</div>
                        <div>📍 {v.location}</div>
                      </div>

                      <div className="desc">{v.desc}</div>

                      <div className="actions">
                        <button
                          className="btnGreen"
                          type="button"
                          onClick={() => onViewDetails(v.id)}
                        >
                          View Details
                        </button>

                        <button
                          className="btnGhost btnGhostDanger"
                          type="button"
                          onClick={() => removeFromCompare(v.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Toolbar */}
            <div className="resultsToolbarPanel">
              <div className="resultsToolbar">
                <select
                  className="select sortSelect"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                  <option>Most Reviews</option>
                </select>

                {/* Grid/List */}
                <div className="toolbarIcons">
                  <button
                    className={`iconBtn ${
                      viewMode === "grid" ? "iconBtnActive" : ""
                    }`}
                    type="button"
                    title="Grid view"
                    onClick={() => setViewMode("grid")}
                  >
                    ▦
                  </button>

                  <button
                    className={`iconBtn ${
                      viewMode === "list" ? "iconBtnActive" : ""
                    }`}
                    type="button"
                    title="List view"
                    onClick={() => setViewMode("list")}
                  >
                    ≡
                  </button>
                </div>
              </div>
            </div>

            {/* Results list */}
            <div
              className={`cards ${
                viewMode === "list" ? "cardsList" : "cardsGrid"
              }`}
            >
              {filteredAndSorted.map((v) => {
                const isCompared = compareIds.includes(v.id);

                return (
                  <div
                    key={v.id}
                    className={`vendorCard2 ${
                      isCompared ? "vendorCardSelected" : ""
                    }`}
                  >
                    <div className="imgArea">
                      <div className="truckIcon">🚚</div>
                    </div>

                    <div className="body">
                      <div className="topRow">
                        <div className="name">{v.name}</div>
                        <div className="price">{money(v.price)}</div>
                      </div>

                      <div className="tagRow2">
                        {v.verified && <span className="verifiedTag">Verified</span>}
                        {!v.available && (
                          <span className="unavailableTag">Currently Unavailable</span>
                        )}
                      </div>

                      <div className="meta">
                        <span className="star">★</span>
                        <span>{v.rating}</span>
                        <span className="muted">({v.reviews} reviews)</span>
                      </div>

                      <div className="submeta">
                        <div>🚚 {v.vehicleType}</div>
                        <div>📍 {v.location}</div>
                      </div>

                      <div className="desc">{v.desc}</div>

                      <div className="actions">
                        <button
                          className="btnGreen"
                          type="button"
                          onClick={() => onViewDetails(v.id)}
                        >
                          View Details
                        </button>

                        <button
                          className={`btnGhost ${
                            isCompared ? "btnGhostDanger" : ""
                          }`}
                          type="button"
                          onClick={() => onToggleCompare(v.id)}
                          disabled={!v.available && !isCompared}
                          title={
                            !v.available && !isCompared
                              ? "Unavailable"
                              : isCompared
                              ? "Remove from compare"
                              : "Add to compare"
                          }
                        >
                          {isCompared ? "Remove" : "Compare"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredAndSorted.length === 0 && (
                <div className="empty">No services match your filters.</div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
