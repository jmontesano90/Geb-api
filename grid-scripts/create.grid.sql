CREATE TABLE geb_grids(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES geb_users(id),
    grid_id INTEGER REFERENCES geb_outlines(id),
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    comment TEXT,
    x TEXT NOT NULL,
    y TEXT NOT NULL,
    transect_count INTEGER NOT NULL,
    minimum INTEGER NOT NULL,
    partial_transect_count INTEGER NOT NULL,
    partial_transect_length INTEGER NOT NULL,
    x_partial TEXT NOT NULL,
    y_partial TEXT NOT NULL,
    direction TEXT NOT NULL
);