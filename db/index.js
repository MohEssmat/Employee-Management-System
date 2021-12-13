var inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./connection.js");
var mysql = require("mysql");

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          viewDepts();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

function viewDepts() {
  var query = "SELECT name, id FROM employees.department ORDER BY id asc";
  connection.query(query, function (err, res) {
    console.table(res);
    runSearch();
  });
}

function viewEmployees() {
  var query =
    "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
  connection.query(query, function (err, res) {
    console.table(res);
    runSearch();
  });
}

function viewRoles() {
  var query =
    "SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;";
  connection.query(query, function (err, res) {
    console.table(res);
    runSearch();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "manID",
        type: "input",
        message: "What is your manager ID?",
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [answer.firstName, answer.lastName, answer.roleID, answer.manID],
        function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Employee: ${answer.firstName} ${answer.lastName}`);
            runSearch();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      {
        name: "departmentID",
        type: "input",
        message:
          "What is the Department ID for this new role? Please select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
        choices: [1, 2, 3, 4],
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(
        query,
        [answer.title, answer.salary, answer.departmentID],
        function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Role: ${answer.title}`);
            runSearch();
          }
      )}
    )}

function addDept() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUE (?)";
      connection.query(query, answer.departmentName, function (err, res) {
        if (err) throw err;
        console.log(`Successfully Added Department!`);
        runSearch();
      });
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "currentEmployeeID",
        type: "input",
        message: "What is the ID of the employee you would like update?",
      },
      {
        name: "newRoleTitle",
        type: "input",
        message: "What is the title of their new role?",
      },
      {
        name: "newRoleSalary",
        type: "input",
        message: "What is their new salary?",
      },
      {
        name: "newRoleDeptID",
        type: "list",
        message: "What department will they belong to? Select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
        choices: [1, 2, 3, 4]
      },
    ])
    .then(function(answer) {
      var query = "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?";
          connection.query(query, [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDeptID, parseInt(answer.currentEmployeeID)], function(err, res) {
            if (err) throw (err);
            console.log("Successful Update!");
            runSearch();
            })
        }
)}

function exit() {
    process.exit(); 
}

module.exports = runSearch;