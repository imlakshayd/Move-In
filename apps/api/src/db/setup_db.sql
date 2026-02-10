-- Consolidated Migration Script for Supabase
-- Fixed syntax errors from original migration files

-- V1__enums.sql
CREATE TYPE user_role AS ENUM (
  'GUEST',
  'REGISTERED_USER',
  'VENDOR',
  'MANAGER',
  'VEHICLE_OWNER',
  'SUPPORT_STAFF'
);

CREATE TYPE booking_status AS ENUM (
  'PENDING',
  'CONFIRMED',
  'IN_TRANSIT',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE payment_status AS ENUM (
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED'
);

CREATE TYPE notification_type AS ENUM (
  'BOOKING_CONFIRMATION',
  'STATUS_UPDATE',
  'PAYMENT_CONFIRMATION',
  'CANCELLATION',
  'REMINDER'
);

-- V2__users.sql
CREATE TABLE IF NOT EXISTS users (
	user_id SERIAL PRIMARY KEY,
  	email VARCHAR(255) UNIQUE NOT NULL,
  	password VARCHAR(255) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	role user_role NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,
	last_login TIMESTAMPTZ,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "registered_user" (
	user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
  	address VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "vendor" (
	user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
	business_name VARCHAR(100) NOT NULL,
	business_license VARCHAR(50) NOT NULL,
	is_verified BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "vehicle_owner" (
	user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
	drivers_license VARCHAR(17) NOT NULL,
	insurance_info VARCHAR(100) NOT NULL,
	documents_verified BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "manager" (
	user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
  	department VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS "support_staff" (
	user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
  	department VARCHAR(50) NOT NULL
);

-- V3__listings.sql
CREATE TABLE IF NOT EXISTS "listing" (
	listing_id SERIAL PRIMARY KEY,
	owner_id INTEGER NOT NULL REFERENCES users(user_id),
	title VARCHAR(50) NOT NULL,
	description VARCHAR(255) NOT NULL,
	base_price DOUBLE PRECISION NOT NULL,
	location VARCHAR(255) NOT NULL,
	is_active BOOLEAN NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

-- V4__bookings.sql
CREATE TABLE IF NOT EXISTS "booking" (
	booking_id SERIAL PRIMARY KEY,
	customer_id INTEGER NOT NULL REFERENCES users(user_id),
	listing_id INTEGER NOT NULL REFERENCES listing(listing_id),
	booking_date DATE NOT NULL,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
	status booking_status NOT NULL,
	total_amount DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS "progress_tracker" (
	tracker_id SERIAL PRIMARY KEY,
	booking_id INTEGER NOT NULL REFERENCES booking(booking_id),
	current_stage VARCHAR(255) NOT NULL,
	stage_timestamps TIMESTAMPTZ[] NOT NULL
);

-- V5__payments.sql
CREATE TABLE IF NOT EXISTS "payment" (
	payment_id SERIAL PRIMARY KEY,
	booking_id INTEGER NOT NULL REFERENCES booking(booking_id),
	amount DOUBLE PRECISION NOT NULL,
	status payment_status NOT NULL,
	transaction_id VARCHAR(255) NOT NULL,
	payment_date TIMESTAMPTZ NOT NULL,
	payment_method VARCHAR(50) NOT NULL
);

-- V6__reviews_notifications_messages.sql
CREATE TABLE IF NOT EXISTS "review" (
	review_id SERIAL PRIMARY KEY,
	booking_id INTEGER NOT NULL REFERENCES booking(booking_id),
	reviewer_id INTEGER NOT NULL REFERENCES users(user_id),
	reviewee_id INTEGER NOT NULL REFERENCES users(user_id),
	rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
	comment VARCHAR(255),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	is_verified BOOLEAN NOT NULL
);

ALTER TABLE review ADD CONSTRAINT unique_review_per_booking UNIQUE (booking_id, reviewer_id);

CREATE TABLE IF NOT EXISTS "notification" (
	notification_id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(user_id),
	message VARCHAR(255) NOT NULL,
	type notification_type NOT NULL,
	sent_at TIMESTAMPTZ NOT NULL,
	is_read BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS "message" (
	message_id SERIAL PRIMARY KEY,
	sender_id INTEGER NOT NULL REFERENCES users(user_id),
	receiver_id INTEGER NOT NULL REFERENCES users(user_id),
	content VARCHAR(255) NOT NULL,
	sent_at TIMESTAMPTZ NOT NULL,
	is_read BOOLEAN NOT NULL
);

-- V7__documents.sql
CREATE TABLE IF NOT EXISTS "document" (
	document_id SERIAL PRIMARY KEY,
	owner_id INTEGER NOT NULL REFERENCES users(user_id),
	document_type VARCHAR(100) NOT NULL,
	file_url TEXT NOT NULL,
	uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	is_verified BOOLEAN NOT NULL
);

-- V8__filters.sql
CREATE TABLE IF NOT EXISTS "search_filter" (
	filter_id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(user_id),
	vehicle_type VARCHAR(255),
	min_price DOUBLE PRECISION,
	max_price DOUBLE PRECISION,
	start_date DATE,
	end_date DATE,
	location VARCHAR(255),
	distance_radius INTEGER
);
