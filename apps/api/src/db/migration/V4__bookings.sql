
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
