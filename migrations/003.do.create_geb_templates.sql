CREATE TABLE geb_templates(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES geb_users(id),
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    name TEXT,
    transect_count INTEGER NOT NULL,
    minimum INTEGER NOT NULL,
    partial_transect_count INTEGER NOT NULL,
    partial_transect_length INTEGER NOT NULL
)