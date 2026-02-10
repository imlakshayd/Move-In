
CREATE TABLE IF NOT EXISTS users (
	user_id SERIAL PRIMARY KEY,
  	email VARCHAR(255) UNIQUE NOT NULL,
  	password VARCHAR(255) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	role user_role NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,
	last_login TIMESTAMPS,
	created_at TIMESTAMPTZ NOT NULL NOW(),
	updated_at TIMESTAMPTZ NOT NULL NOW()
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
