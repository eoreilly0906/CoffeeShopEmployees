USE employee_db;

INSERT INTO department (name) VALUES 
('Barista'), 
('Cashier'), 
('Manager');

INSERT INTO role (title, salary, department_id) VALUES 
('Barista', 16000, 1), 
('Cashier', 14000, 2), 
('Manager', 20000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Edward', 'OReilly', 1, NULL), 
('Kevin', 'OReilly', 2, NULL), 
('Neil', 'OReilly', 3, NULL);