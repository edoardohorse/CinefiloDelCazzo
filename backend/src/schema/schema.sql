-- Create ENUM type for FilmType
CREATE TYPE film_type AS ENUM ('film', 'anime');

-- Create films table
CREATE TABLE films
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(255)                        NOT NULL,
    thumbnail    TEXT,
    release_date TIMESTAMP,
    end_date     TIMESTAMP,
    type         film_type DEFAULT 'film'            NOT NULL,
    description  TEXT,
    links        TEXT[]    DEFAULT '{}'              NOT NULL,
    seen         BOOLEAN   DEFAULT false,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    -- Add unique constraint on name
    CONSTRAINT films_name_unique UNIQUE (name)
);

-- Create an index on name for better query performance
CREATE INDEX idx_films_name ON films (name);

-- Create an index on type for filtering
CREATE INDEX idx_films_type ON films (type);

-- Create an index on release_date for date range queries
CREATE INDEX idx_films_release_date ON films (release_date);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row update
CREATE TRIGGER update_films_updated_at
    BEFORE UPDATE
    ON films
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();