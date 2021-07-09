const inquirer = require("inquirer");
const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Connected as ID' + db.threadId)
    startPrompt();
});

//Prompt
function startPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ]
        }
    ]).then(function(response){
        switch (response.choice) {
            // case "View All Departments": viewDepartments();
            // break;

            // case "View All Roles": viewRoles();
            // break;

            case "View All Employees": viewEmployees();
            break;

            // case "Add a Department": addDepartment();
            // break;

            // case "Add a Role": addRole();
            // break;

            // case "Add a Employee": addEmployee();
            // break;

            // case "Update an Employee Role": updateRole();
            // break;
        }
    })
}

//View All Employees
function viewEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name;",
    function(err, res) {
        if (err) throw err
        console.log.table(res)
        startPrompt()
    })
}