CREATE TABLE IF NOT EXISTS "listing" (
	listing_id SERIAL PRIMARY KEY,
	owner_id INTEGER NOT NULL REFERENCES users(user_id),
	title VARCHAR(50) NOT NULL,
	description VARCHAR(255) NOT NULL,
	base_price DOUBLE PRECISION NOT NULL,
	location VARCHAR(255) NOT NULL,
	is_active BOOLEAN NOT NULL,
	created_at TIMESTAMPTZ NOT NULL NOW(),
	updated_at TIMESTAMPTZ NOT NULL NOW()
);

CREATE TABLE IF NOT EXISTS "vehicle_listing" (
	listing_id INTEGER PRIMARY KEY REFERENCES listing(listing_id),
	vehicle_type VARCHAR(50) NOT NULL,
	vehicle_model VARCHAR(255) NOT NULL,
	capacity INTEGER NOT NULL,
	insurance_status VARCHAR(50) NOT NULL,
	photos TEXT[] NOT NULL
);

CREATE TABLE IF NOT EXISTS "service_listing" (
	listing_id INTEGER PRIMARY KEY REFERENCES listing(listing_id),
	service_type VARCHAR(255) NOT NULL,
	crew_size INTEGER NOT NULL,
	equipment_provided VARCHAR(255) NOT NULL
);