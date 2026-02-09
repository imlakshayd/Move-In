CREATE TABLE IF NOT EXISTS "review" (
	review_id SERIAL PRIMARY KEY,
	booking_id INTEGER NOT NULL REFERENCES booking(booking_id),
	reviewer_id INTEGER NOT NULL REFERENCES users(user_id),
	reviewee_id INTEGER NOT NULL REFERENCES users(user_id),
	rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
	comment VARCHAR(255),
	created_at TIMESTAMPTZ NOT NULL NOW(),
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