import inquirer from 'inquirer';
import db from '../db/connection.js';

function startApp() {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.choice) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            default:
                db.end();
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department')
        .then(result => {
            console.table(result.rows);
            startApp();
        })
        .catch(err => {
            console.error('Error:', err);
            startApp();
        });
}

function viewRoles() {
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary 
              FROM role JOIN department ON role.department_id = department.id`, 
    (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, 
              department.name AS department, role.salary, 
              CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee 
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, 
    (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
    }).then(answer => {
        db.query('INSERT INTO department (name) VALUES ($1)', [answer.name])
            .then(() => {
                console.log('Department added successfully!');
                startApp();
            })
            .catch(err => {
                console.error('Error:', err);
                startApp();
            });
    });
}

function addRole() {
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary:'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Choose a department:',
                choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
            }
        ]).then(answer => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
            [answer.title, answer.salary, answer.department_id], 
            (err) => {
                if (err) throw err;
                console.log('Role added successfully!');
                startApp();
            });
        });
    });
}

function addEmployee() {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) throw err;
        db.query('SELECT * FROM employee', (err, employees) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Enter the employee's first name:"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Enter the employee's last name:"
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose a role:',
                    choices: roles.map(role => ({ name: role.title, value: role.id }))
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Choose a manager (optional):',
                    choices: [{ name: 'None', value: null }].concat(
                        employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
                    )
                }
            ]).then(answer => {
                db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
                [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], 
                (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    startApp();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, employees) => {
        if (err) throw err;
        db.query('SELECT * FROM role', (err, roles) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Choose an employee to update:',
                    choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose a new role:',
                    choices: roles.map(role => ({ name: role.title, value: role.id }))
                }
            ]).then(answer => {
                db.query('UPDATE employee SET role_id = ? WHERE id = ?', 
                [answer.role_id, answer.employee_id], 
                (err) => {
                    if (err) throw err;
                    console.log('Employee role updated!');
                    startApp();
                });
            });
        });
    });
}

startApp();