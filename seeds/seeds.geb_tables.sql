BEGIN;

TRUNCATE
    geb_users,
    geb_grids
    RESTART IDENTITY CASCADE;

INSERT INTO geb_users (user_name, full_name, password)
VALUES
('joe', 'Joseph Montesano', 'janjm2020'),
('John', 'John Montesano','johnsucks' );

INSERT INTO geb_grids (user_id, x, y, partial_transect_length, x_partial, y_partial)
VALUES
(1, '12', '11,5,22', 5, '2,4', '21,14'),
(2, '25,3', '3,21', 5, '13,12', '14,3');

COMMIT;