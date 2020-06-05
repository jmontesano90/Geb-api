ALTER TABLE geb_grids
    ADD COLUMN 
        grid_id INTEGER REFERENCES geb_outlines(id);
