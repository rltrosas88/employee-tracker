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
            case "View All Departments": viewDepartments();
            break;

            case "View All Roles": viewRoles();
            break;

            case "View All Employees": viewEmployees();
            break;

            case "Add a Department": addDepartment();
            break;

            case "Add a Role": addRole();
            break;

            case "Add a Employee": addEmployee();
            break;

            case "Update an Employee Role": updateRole();
            break;
        }
    })
}

//View All Employees
function viewEmployees() {
    console.log('');
    let query = "SELECT * FROM employee";
    const rows = db.query(query);
    console.table(rows);
}

//View All Departments
function viewDepartments() {
    console.log('');
    let query = "SELECT * FROM department";
    const rows = db.query(query);
    console.table(rows);
}

//View All Roles
function viewRoles() {
    console.log('');
    let query = "SELECT * FROM role";
    const rows = db.query(query);
    console.table(rows);
}

//Add a Department
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ]).then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
}

//Add a Role
function addRole() {
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role", 
    function(err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the role's Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"
            }
        ]).then(function(res) {
            db.query("INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            })
        });
    });
}

//Select Role function
let roleArray = [];
function selectRole() {
    db.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}

//Select Manager function
let managerArray = [];
function selectManager() {
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
}

//Add an Employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            messate: "What is their first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is their last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "What is their manager's name?",
            choice: selectManager()
        }
    ]).then(function(response) {
        let roleId = selectRole().indexOf(response.role) + 1;
        let managerId = selectManager().indexOf(response.choice) + 1;

        db.query("INSERT INTO employee SET ?",
        {
            first_name: response.firstName,
            last_name: response.lastName,
            manager_id: managerId,
            role_id: roleId
        },
        function(err) {
            if (err) throw err
            console.table(response)
            startPrompt()
        })
    })
}

//Get Role ID
function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = db.query(query.args);
    return rows[0].id;
}
//Get Employee's full name
function getFullName(fullName) {
    let employee = fullName.split(" ");
    if(employee.length == 2) {
        return employee;
    }

    let last_name = employee[employee.length - 1];
    let first_name = "";
    for(var i = 0; i < employee.length - 1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}

//Update an Employee Role
function updateRole() {
    let roleID = getRoleId(information.role);
    let employee = getFullName(information.employeeName);
    let query = "UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?";
    let args = [roleId, employee[0], employee[1]];
    let rows = db.query(query, args);
    console.log(`Updated employe #{employee[0]} ${employee[1]} with role ${information.role}`);
}

