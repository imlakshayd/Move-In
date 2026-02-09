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