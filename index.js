// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.host,
    // MySQL username,
    user: process.env.user,
    // MySQL password
    password: process.env.password,
    database: process.env.database
  },
  console.log(`Connected to the ${process.env.database} database.`)
);

function viewDepartments() {
// Query database
db.query('SELECT * FROM departments', function (err, results) {
  console.log(results);
});
};

function viewRoles() {
    // Query database
    db.query('SELECT * FROM roles', function (err, results) {
      console.log(results);
    });
    };

function viewEmployees() {
    // Query database
    db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
    });
    };

    
function addDepartment() {
    // Ask for new department name
    inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the name of the department? ",
        name: 'departmentName',
      },
    ])
      .then((data) => {

    db.query(`INSERT INTO department (name) VALUES ("${data.departmentName}")`, function (err, results) {
        console.log(`Added ${data.departmentName} to the database`);
    });
    })
    .then(() => {
      mainMenu();
    })
  };

function addRole() {
    // Ask for new role information
    inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the name of the role? ",
        name: 'roleName',
      },
      {
        type: 'number',
        message: "What is the salary of the role? ",
        name: 'salary',
      },
      {
        type: 'list',
        message: "Which department does the role belong to? ",
        name: 'department',
        choices: []
      },
    ])
      .then((data) => {

//loop to identify which department for the ID

    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.roleName}", ${data.salary}, )`, function (err, results) {
        console.log(`Added ${data.roleName} to the database`);
    });
  })
  .then(() => {
    mainMenu();
  })
};

function addEmployee() {
    // Ask for new role information
    inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the employee's first name? ",
        name: 'firstName',
      },
      {
        type: 'input',
        message: "What is the employee's last name? ",
        name: 'lastName',
      },
      {
        type: 'list',
        message: "What is the employee's role? ",
        name: 'role',
        choices: []
      },
      {
        type: 'list',
        message: "Who is the employee's manager? ",
        name: 'manager',
        choices: []
      },
    ])
      .then((data) => {

//loop to identify which department for the ID

    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.role}, ${data.manager})`, function (err, results) {
        console.log(`Added ${data.firstName} ${data.lastName} to the database`);
    });
  })
  .then(() => {
    mainMenu();
  })
};

function updateEmployeeRole() {
  // Query database
  db.query('INSERT * FROM roles', function (err, results) {
      console.log(results);
  });
  };

function updateEmployeeManager() {
  // Query database
  db.query('INSERT * FROM roles', function (err, results) {
      console.log(results);
  });
  };

function updateEmployeeManager() {
  // Query database
  db.query('INSERT * FROM roles', function (err, results) {
      console.log(results);
  });
  };

function viewManagerEmployees() {
  // Query database
  inquirer
  .prompt([
    {
      type: 'list',
      message: "Which manager's employees would you like to view? ",
      name: 'manager',
      choices: []
    },
  ])
    .then((data) => {
  db.query(`SELECT id FROM employee as ID, first_name FROM employee as "First Name", last_name FROM employee as "Last Name", role FROM role as Role WHERE manager_id=${data.manager}`, function (err, results) {
      console.log(results);
  });
  })};

function viewDepartmentEmployees() {
  // Query database
  inquirer
  .prompt([
    {
      type: 'list',
      message: "Which department's employees would you like to view? ",
      name: 'department',
      choices: []
    },
  ])
    .then((data) => {
  db.query(`SELECT id FROM employee as ID, first_name FROM employee as "First Name", last_name FROM employee as "Last Name", role FROM role as Role WHERE department_id=${data.department}`, function (err, results) {
      console.log(results);
  });
  })};

function deleteDepartment() {
  // Query database
    // Ask for new role information
    inquirer
    .prompt([
      {
        type: 'list',
        message: "Which department should be deleted? ",
        name: 'department',
        choices: []
      },
    ])
      .then((data) => {


  db.query('DELETE FROM department WHERE id=""', function (err, results) {
      console.log(`${data.department} department deleted.`);
  });
  })};

function deleteRole() {
  // Query database
  inquirer
  .prompt([
    {
      type: 'list',
      message: "Which role should be deleted? ",
      name: 'role',
      choices: []
    },
  ])
    .then((data) => {


db.query('DELETE FROM role WHERE id=""', function (err, results) {
    console.log(`${data.role} role deleted.`);
});
})};

function deleteEmployee() {
  // Query database
  inquirer
  .prompt([
    {
      type: 'list',
      message: "Which employee should be deleted? ",
      name: 'employee',
      choices: []
    },
  ])
    .then((data) => {


db.query('DELETE FROM employee WHERE id=""', function (err, results) {
    console.log(`${data.employee} employee file deleted.`);
});
})};

function viewDepartmentBudget() {
  // Query database
  db.query('SELECT SUM(role.salary) AS "Total Budget", department.name AS "Department" FROM role JOIN department ON role.department_id = department.id GROUP BY department.id', function (err, results) {
      console.log(results);
  });
  };


//initialize the program 
function init() {

  mainMenu();
   
  }

//main menu to determine next steps
function mainMenu() {
inquirer
  .prompt([
  {
    type: 'list',
    message: "What would you like to do?",
    name: 'selection',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role',
  "Update employee managers", "View employees by manager", "View employees by department", "Delete department", "Delete role", "Delete employee", "View total department budget", "Quit"],
  },
  ])
   .then((data) => {

     //send user to appropriate function.
     const selection = data.selection;
    switch (selection) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
           viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
            break;
        case 'Update employee managers':
            updateEmployeeManager();
            break;
        case 'View employees by manager':
            viewManagerEmployees();
        case 'View employees by department':
            viewDepartmentEmployees();
            break;
        case 'Delete department':
            deleteDepartment();
            break;
        case 'Delete role':
            deleteRole();
            break;
        case 'Delete employee':
            deleteEmployee();
            break;
        case 'View total department budget':
            viewDepartmentBudget();
            break;
            case 'Quit':
            return;
      }
    });
  }

  init();