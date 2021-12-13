use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Leslie', 'Knope', 1, NULL),
    ('Ann', 'Perkins', 2, 1),
    ('Ron', 'Swanson', 3, NULL),
    ('Andy', 'Dwyer', 4, 3),
    ('Chris', 'Traeger', 5, NULL),
    ('Ben', 'Wyatt', 6, 5),
    ('Tom', 'Haverford', 7, NULL),
    ('April', 'Ludgate', 8, 7);
