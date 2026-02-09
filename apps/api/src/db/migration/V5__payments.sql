CREATE TABLE IF NOT EXISTS "payment" (
	payment_id SERIAL PRIMARY KEY,
	booking_id INTEGER NOT NULL REFERENCES booking(booking_id),
	amount DOUBLE PRECISION NOT NULL,
	status payment_status NOT NULL,
	transaction_id VARCHAR(255) NOT NULL,
	payment_date TIMESTAMPTZ NOT NULL,
	payment_method VARCHAR(50) NOT NULL
);