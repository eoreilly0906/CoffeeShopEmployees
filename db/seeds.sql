INSERT INTO department (id, name) VALUES (1, 'Sales');
INSERT INTO department (id, name) VALUES (2, 'Engineering');
INSERT INTO department (id, name) VALUES (3, 'Finance');
INSERT INTO department (id, name) VALUES (4, 'Legal');


INSERT INTO role (id, title, salary, department_id) VALUES (1, 'Sales Lead', 100000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'Salesperson', 80000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Lead Engineer', 150000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (4, 'Software Engineer', 120000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (5, 'Accountant', 125000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, 'John', 'Doe', 1, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Jane', 'Smith', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Michael', 'Johnson', 3, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Emily', 'Williams', 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, 'David', 'Brown', 5, NULL);

