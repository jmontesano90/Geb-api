BEGIN;

TRUNCATE
    geb_users,
    geb_grids
    RESTART IDENTITY CASCADE;

INSERT INTO geb_users (user_name, full_name, password)
VALUES
('joe', 'Joseph Montesano', '$2a$12$BhInUs.pd/7g7DKLBcRBx.09aw1hHD5tWcRrgi1sYueQS4px0/RvO'),
('John', 'John Montesano','$2a$12$TIveU0GIuw064szN3zE6wuNO5g6QRP01ovMpK/y.x3H0Eow8sEGia' );

INSERT INTO geb_templates (user_id, name, transect_count, minimum, partial_transect_length, partial_transect_count, x, y)
VALUES
(1,'Connetquot', 5, 3, 5, 1, 30, 30),
(1,'Peqout', 7, 3, 4, 1, 50, 60),
(2,'Ishmael', 7, 3, 4, 1, 300, 300),
(2,'Timber Point', 2, 3, 5, 1, 100,100);

INSERT INTO geb_grids (user_id, x, y, partial_transect_length, x_partial, y_partial, direction, template_id)
VALUES
(1, '12', '11,5,22', 5, '2,4', '21,14', '0,2', 1),
(2, '25,3', '3,21', 5, '13,12', '14,3', '2,1', 2);

COMMIT;