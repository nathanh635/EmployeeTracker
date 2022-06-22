// Import and require external packages for mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer')

let db;

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

//Query to view all departments
function viewDepartments() {
  // Query database
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    mainMenu();
  });

};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

//Query to view all roles
function viewRoles() {
  // Query database
  db.query('SELECT role.id AS "Role ID", role.title AS "Role Title", role.salary as "Salary", department.name as "Department" FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    console.table(results);
    mainMenu();
  });
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

//Query to view all employees
function viewEmployees() {
  // Query database
  db.query('SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name as "Last Name", role.title as "Role Title", role.salary as "Salary", department.name as "Department" FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
    console.table(results);
    mainMenu();
  });
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

//Query to add new department
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
      //insert new department into the database
      db.query(`INSERT INTO department (name) VALUES ("${data.departmentName}")`, function (err, results) {

      });
      console.log(`Added ${data.departmentName} to the database`);
    })
    .then(() => {
      mainMenu();
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

//Query to add role to database
function addRole() {
  // Set variables to hold query information for inquirer prompt

  let departments = [];
  let dIDs = [];
  let x;

  //query the database to define the departments to select from for the final options

  db.query(`SELECT * FROM department`, function (err, results) {
    for (let i = 0; i<results.length; i++) {
        departments.push(results[i].name); 
        dIDs.push(results[i].id);
    }
  })

  //take information from the user about what role to add
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
        choices: departments
      },
    ])
    .then((data) => {

        //find index of departments where selected department was, use that to populate department ID when entered into SQL
      x = departments.indexOf(department,0);

      db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.roleName}", ${data.salary}, ${dIDs[x]})`, function (err, results) {
        console.log(`Added ${data.roleName} to the database`);
      });
    })
    .then(() => {
      mainMenu();
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

//Query to add new employee to database
function addEmployee() {
  // Ask for new employee information

  let roles = [];
  let roleIDs = [];
  let employees = [];
  let employeeIDs = [];
  let x;
  let you;

  //define the departments to select from for the final options

  db.query(`SELECT * FROM role`, function (err, results) {
    for (let i = 0; i<results.length; i++) {
        roles.push(results[i].name); 
        roleIDs.push(results[i].id);
    }

  })

  db.query(`SELECT * FROM employee`, function (err, results) {
    for (let i = 0; i<results.length; i++) {
        employees.push(results[i].name); 
        employeeIDs.push(results[i].id);
    }

  })

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
        choices: roles
      },
      {
        type: 'list',
        message: "Who is the employee's manager? ",
        name: 'manager',
        choices: employees
      },
    ])
    .then((data) => {

      //send to database

      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.role}, ${data.manager})`, function (err, results) {
        console.log(`Added ${data.firstName} ${data.lastName} to the database`);
      });
    })
    .then(() => {
      mainMenu();
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function updateEmployeeRole() {
  // Query database
// Ask for new employee information

let roles = [];
let roleIDs = [];
let employees = [];
let employeeIDs = [];
let x;

//define the departments to select from for the final options

db.query(`SELECT * FROM role`, function (err, results) {
  for (let i = 0; i<results.length; i++) {
      roles.push(results[i].name); 
      roleIDs.push(results[i].id);
  }

})

db.query(`SELECT * FROM employee`, function (err, results) {
  for (let i = 0; i<results.length; i++) {
    let current = results[i].first_name & " " & results[i].last_name;
      employees.push(current); 
      employeeIDs.push(results[i].id);
  }
})

inquirer
    .prompt([
      {
        type: 'list',
        message: "Whhich employee do you want to change the role for? ",
        name: 'employee',
        choices: employees
      },
      {
        type: 'list',
        message: "What is the employee's new role? ",
        name: 'role',
        choices: roles
      },
    ])
    .then((data) => {

      //send to database

      db.query(`UPDATE employee SET role_id = _______ WHERE VALUES ("${data.firstName}", "${data.lastName}", ${data.role}, ${data.manager})`, function (err, results) {
        console.log(`Updated ${data.firstName} ${data.lastName} to the database`);
      });
    })
    .then(() => {
      mainMenu();
    })

};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function updateEmployeeManager() {
  // Query database
  db.query('INSERT * FROM roles', function (err, results) {
    console.log(results);
  });
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function updateEmployeeManager() {
  // Query database
  db.query('INSERT * FROM roles', function (err, results) {
    console.log(results);
  });
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function viewManagerEmployees() {

  db.query(`SELECT * FROM employee`, function (err, results) {
    for (let i = 0; i<results.length; i++) {
      let current = results[i].first_name & " " & results[i].last_name;
        employees.push(current); 
        employeeIDs.push(results[i].id);
    }
  })
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
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function viewDepartmentEmployees() {

  let departments = [];
  let depIDs = [];

  db.query(`SELECT * FROM department`, function (err, results) {
    for (let i = 0; i<results.length; i++) {

        departments.push(results.name); 
        depIDs.push(results[i].id);
    }
  })

    // Query database
  inquirer
    .prompt([
      {
        type: 'list',
        message: "Which department's employees would you like to view? ",
        name: 'department',
        choices: departments
      },
    ])
    .then((data) => {
      db.query('SELECT department.name AS "Department Name", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Role" FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = "${results.department}";', function (err, results) {
        console.table(results);
      });
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function deleteDepartment() {
  // Query database
  let departments = [];
  let depIDs = [];
  let x;

  db.query(`SELECT * FROM department`, function (err, results) {
    for (let i = 0; i<results.length; i++) {

        departments.push(results.name); 
        depIDs.push(results[i].id);
    }
  })

  // Ask for new role information
  inquirer
    .prompt([
      {
        type: 'list',
        message: "Which department should be deleted? ",
        name: 'department',
        choices: departments
      },
    ])
    .then((data) => {
      x = departments.indexOf(department,0);

      db.query(`DELETE FROM department WHERE id="${depIDs[x]}"`, function (err, results) {
        console.log(`${data.department} department deleted.`);
      });
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function deleteRole() {
  // Query database
  let roles = [];
  let roleIDs = [];
  let employees = [];
  let employeeIDs = [];
  let x;
  
  //define the departments to select from for the final options
  
  db.query(`SELECT * FROM role`, function (err, results) {
    for (let i = 0; i<results.length; i++) {
        roles.push(results[i].name); 
        roleIDs.push(results[i].id);
    }
  
  })

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
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function deleteEmployee() {
  // Query database

  let employees = [];
  let employeeIDs = [];
  let x;

  //define the departments to select from for the final options

  db.query(`SELECT * FROM employee`, function (err, results) {
    for (let i = 0; i<results.length; i++) {
      let current = results[i].first_name & " " & results[i].last_name;
        employees.push(current); 
        employeeIDs.push(results[i].id);
    }
  })

  inquirer
    .prompt([
      {
        type: 'list',
        message: "Which employee should be deleted? ",
        name: 'employee',
        choices: employees
      },
    ])
    .then((data) => {

      x = departments.indexOf(department,0);

      db.query(`DELETE FROM employee WHERE id="${employeeIDs[x]}"`, function (err, results) {
        console.log(`${data.employee} employee file deleted.`);
      });
    })
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

function viewDepartmentBudget() {
  // Query database
     db.query('SELECT department.name AS "Department Name", SUM(role.salary) AS "Total Budget" FROM role JOIN department ON role.department_id = department.id GROUP BY department.name;', function (err, results) {
    console.table(results);
  });
};

//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//

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
      if (selection === "Quit") {
        return;
      }
      db = require('./db/connection')
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

mainMenu();