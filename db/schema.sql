DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS raffles;

CREATE TABLE raffles (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    secret_token varchar(255) NOT NULL,
    ended BOOLEAN DEFAULT FALSE,
    winner_id INTEGER DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    raffle_id INTEGER REFERENCES raffles (id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL
);