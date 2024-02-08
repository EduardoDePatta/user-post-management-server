CREATE TABLE personal.users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deactivated_at TIMESTAMP,
    fl_active BOOLEAN DEFAULT true
);

CREATE OR REPLACE FUNCTION personal.update_last_modified()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_last_modified_trigger
BEFORE UPDATE ON personal.users
FOR EACH ROW
EXECUTE FUNCTION personal.update_last_modified();
