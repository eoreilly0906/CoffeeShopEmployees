import inquirer from 'inquirer';
import db from '../db/connection.js';

function startApp() {
    console.log('Welcome to the Simply Coffee Employee Tracker!');
    console.log('  ( (');
    console.log(' ........');
    console.log(' |      |]');
    console.log(' \\      /');
    console.log('  `----\'');
    
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'Add a Department',
            'Delete a Department',
            'View All Roles',
            'Add a Role',
            'Delete a Role',
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',
            'Delete an Employee',
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
            case 'Delete a Department':
                deleteDepartment();
                break;
            case 'Delete a Role':
                deleteRole();
                break;
            case 'Delete an Employee':
                deleteEmployee();
                break;
            default:
                db.end();
        }
    });
}

function continueApp() {
    console.log('Remember to take a coffee break!')
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'Add a Department',
            'Delete a Department',
            'View All Roles',
            'Add a Role',
            'Delete a Role',
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',
            'Delete an Employee',
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
            case 'Delete a Department':
                deleteDepartment();
                break;
            case 'Delete a Role':
                deleteRole();
                break;
            case 'Delete an Employee':
                deleteEmployee();
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
            continueApp();
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        });
}

function viewRoles() {
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary
              FROM role
              LEFT JOIN department ON role.department_id = department.id`)
    .then(result => {
        console.table(result.rows);
        continueApp();
    })
    .catch(err => {
        console.error('Error:', err);
        continueApp();
    });
}

function viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee AS manager ON employee.manager_id = manager.id`)
    .then(result => {
        console.table(result.rows);
        continueApp();
    })
    .catch(err => {
        console.error('Error:', err);
        continueApp();
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
                continueApp();
            })
            .catch(err => {
                console.error('Error:', err);
                continueApp();
            });
    });
}

function addRole() {
    db.query('SELECT * FROM department')
        .then(result => {
            const departments = result.rows;
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
                db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
                    [answer.title, answer.salary, answer.department_id])
                    .then(() => {
                        console.log('Role added successfully!');
                        continueApp();
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        continueApp();
                    });
            });
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        });
}

function addEmployee() {
    db.query('SELECT * FROM role')
        .then(result => {
            const roles = result.rows;
            return db.query('SELECT * FROM employee')
                .then(empResult => {
                    const employees = empResult.rows;
                    return inquirer.prompt([
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
                    ]);
                });
        })
        .then(answer => {
            return db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
                [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
            );
        })
        .then(() => {
            console.log('Employee added successfully!');
            continueApp();
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        });
}

function updateEmployeeRole() {
    let employees;
    let roles;
    
    db.query('SELECT * FROM employee')
        .then(empResult => {
            employees = empResult.rows;
            return db.query('SELECT * FROM role');
        })
        .then(roleResult => {
            roles = roleResult.rows;
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Choose an employee to update:',
                    choices: employees.map(emp => ({ 
                        name: `${emp.first_name} ${emp.last_name}`, 
                        value: emp.id 
                    }))
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose a new role:',
                    choices: roles.map(role => ({ 
                        name: role.title, 
                        value: role.id 
                    }))
                }
            ]);
        })
        .then(answer => {
            return db.query('UPDATE employee SET role_id = $1 WHERE id = $2', 
                [answer.role_id, answer.employee_id]
            );
        })
        .then(() => {
            console.log('Employee role updated!');
            continueApp();
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        });
}

function deleteDepartment() {
    // First get all departments
    db.query('SELECT * FROM department')
        .then(result => {
            // Prompt user to select from existing departments
            return inquirer.prompt({
                type: 'list',
                name: 'id',
                message: 'Select the department to delete:',
                choices: result.rows.map(dept => ({
                    name: dept.name,
                    value: dept.id
                }))
            });
        })
        .then(answer => {
            // Delete department by ID instead of name
            return db.query('DELETE FROM department WHERE id = $1', [answer.id]);
        })
        .then(() => {
            console.log('Department deleted successfully!');
            continueApp();
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        });
}

function deleteRole() {
    db.query('SELECT * FROM role')
        .then(result => {
            const roles = result.rows;
            return inquirer.prompt({
                type: 'list',
                name: 'id',
                message: 'Select the role to delete:',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            });
        })
        .then(answer => {
            return db.query('DELETE FROM role WHERE id = $1', [answer.id]);
        })
        .then(() => {
            console.log('Role deleted successfully!');
            continueApp();
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        }); 
}

function deleteEmployee() {
    db.query('SELECT * FROM employee')
        .then(result => {
            const employees = result.rows;
            return inquirer.prompt({
                type: 'list',
                name: 'id',
                message: 'Select the employee to delete:',
                choices: employees.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
                }))
            });
        })
        .then(answer => {
            return db.query('DELETE FROM employee WHERE id = $1', [answer.id]);
        })
        .then(() => {
            console.log('Employee deleted successfully!');
            continueApp();
        })
        .catch(err => {
            console.error('Error:', err);
            continueApp();
        });
}


startApp();