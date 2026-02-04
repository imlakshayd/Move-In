CREATE TABLE IF NOT EXISTS "document" (
	document_id SERIAL PRIMARY KEY,
	owner_id INTEGER NOT NULL REFERENCES users(user_id),
	document_type VARCHAR(100) NOT NULL,
	file_url TEXT NOT NULL,
	uploaded_at TIMESTAMPTZ NOT NULL NOW(),
	is_verified BOOLEAN NOT NULL
);