ALTER TABLE geb_grids
    ADD COLUMN 
        template_id INTEGER REFERENCES geb_templates(id);
