USE employeeTrack_db;

INSERT INTO department (name) 
VALUES ('Legal'),
('Engineering'),
('Sales'),
('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 3),
('Salesperson', 80000, 3),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 130000, 4),
('Accountant', 125000, 4),
('Legal Team Lead', 210000, 1);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Nessi', 'Camosso', 3, null),
(2, 'Rockey', 'Swaysland', 5, 1),
(3, 'Alexis', 'Osgardby', 6, null),
(4, 'Adolphus', 'Ringe', 6, 3),
(5, 'Torey', 'Gourlay', 3, null),
(6, 'Andie', 'Kuhl', 5, 3),
(7, 'Ronica', 'Bowra', 2, null),
(8, 'Gustie', 'Rolph', 1, 6),
(9, 'Vicky', 'Earland', 7, null),
(10, 'Ranee', 'Stenning', 2, 5),
(11, 'Merrick', 'Paulley', 2, 5),
(12, 'Hammad', 'Witherspoon', 3, 3),
(13, 'Hendrika', 'OFlannery', 4, 5),
(14, 'Gregg', 'Stegell', 5, null),
(15, 'Sherwood', 'Salamon', 4, 3),
(16, 'Toby', 'Ferrarese', 6, 1),
(17, 'Minne', 'Penburton', 7, null),
(18, 'Lambert', 'Ceyssen', 1, null),
(19, 'Akim', 'Itscowicz', 1, 3),
(20, 'Charlot', 'De Filippo', 2, null);