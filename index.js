const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//initialize the program 
function init() {

    //start by requesting manager's info
    console.log("Please enter your team manager's information.")
  inquirer
  .prompt([
  {
  type: 'input',
  message: "Manager's name: ",
  name: 'name',
  },
  {
  type: 'input',
  message: "Employee ID#: ",
  name: 'id',
  },
  {
  type: 'input',
  message: "Manager's email: ",
  name: 'email',
  },
  {
    type: 'input',
    message: "Office number:",
    name: 'officeNumber',
  },
  
  ])
  .then((data) => {
  const Manager = require('./lib/manager');
  //If I didn't have a global variable for manager, it wasn't accessible in other function blocks of code... so I added it to an array as well
  let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
  managers.push(manager);
  //Add id number to array of id numbers
  idNums.push(manager.id);
  })
  
    .then(() => {
        //send to main menu
  
      addTeamMember();
    })
  }

  /* Bonus

  Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.*/

//main menu to add team members
function addTeamMember() {
    inquirer
  .prompt([
  {
    type: 'list',
    message: "Make a selection: ",
    name: 'selection',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
  },
  ])
  .then((data) => {
    //send user to appropriate function.
    switch (data.selection) {
        case 'View all departments':
          day = "Sunday";
          break;
        case 'View all roles':
          day = "Monday";
          break;
        case 'View all employees':
           day = "Tuesday";
          break;
        case 'Add a department':
          day = "Wednesday";
          break;
        case 'Add a role':
          day = "Thursday";
          break;
        case 'Add an employee':
          day = "Friday";
          break;
        case 'Update an employee role':
            break;
        case 'Update employee managers':
            day = "Friday";
            break;
        case 'View employees by manager':
            day = "Friday";
            break;
        case 'View employees by department':
            day = "Friday";
            break;
        case 'Delete department':
            day = "Friday";
            break;
        case 'Delete role':
            day = "Friday";
            break;
        case 'Delete employee':
            day = "Friday";
            break;
        case 'View total department budget':
            day = "Friday";
            break;
      }
  if (data.teamMember === "Engineer") {
    addEngineer();
  } else if (data.teamMember === "Intern") {
    addIntern();
  } else {
    let text = generateMarkdown()
    writeToFile("./dist/index.html",text);
  }
  
  });
  }

  init();