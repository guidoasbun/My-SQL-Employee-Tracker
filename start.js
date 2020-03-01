const inquirer = require('inquirer')
const cTable = require('console.table')
const db = require('./config/db')
const mysql = require('mysql2')


function menu (){
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'View all employees by department',
      'View all employees by manager',
      'Add employee',
      'Remove employee',
      'Update Employee Role',
      'Update Employee manager',
      'View all roles',
      'Exit'
    ]
  })
  .then (function ({ menu }){
    switch (menu) {
      case 'View all employees':
        displayAllEmployees()
        break
    }
  })
}

function displayAllEmployees () {
  db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
FROM employee e
LEFT JOIN roles r
ON e.role_id = r.id
LEFT JOIN department d
ON d.id = r.department_id
LEFT JOIN employee m
ON m.id = e.manager_id`
, (err, employee) => {
    if (err) throw err
    console.table(employee)
    menu()
  })
}

menu()
   



