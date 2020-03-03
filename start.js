const inquirer = require('inquirer')
const cTable = require('console.table')
const db = require('./config/db')
const mysql = require('mysql2')


function menu() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'Create employee',
      'Read all employees',
      'Update employee',
      'Delete employee',
      'Exit'
    ]
  })
    .then(function ({ menu }) {
      switch (menu) {
        case 'Create employee':
          createEmployee()
          break
        case 'Read all employees':
          readAllEmployees()
          break
        case 'Update employee':
          updateEmployee()
          break
        case 'Delete employee':
          deleteEmployee()
          break
        case 'Exit':
          process.exit()
          break
      }
    })
}

function createEmployee() {
  
  let managerChoises = []
  db.query(`SELECT employee.manager_id, employee.first_name, employee.last_name FROM employee 
  WHERE NOT employee.manager_id = 'NULL'`, (err, manager) => {
    if (err) throw err
    manager.forEach(elem => { managerChoises.push(`${elem.first_name} ${elem.last_name}`)})
})

  let roleChoises = []
  db.query(`SELECT roles.id, roles.title FROM roles`, (err, roles) => {
    roles.forEach(elem => { roleChoises.push({id: elem.id, title: elem.title}) })
  })
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter last name:'
    },
    {
      type: 'list',
      name: 'roles',
      choices: roleChoises
    },
    {
      type: 'list',
      name: 'manager',
      choices: managerChoises
    }
  ])
  // .then(function({firstName, lastName, roles, manager}){
  //   db.query(`INSERT INTO employee SET ?`, {
  //     first_name: firstName,
  //     last_name: last_name,
  //     role_id: ,
  //     manager_id: ,
  //   })
  // })
    
}

function readAllEmployees() {
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

function updateEmployee() {
  
}

function deleteEmployee() {

}

function displayTextArt () {
  console.log(`
╔═══╗─────╔╗──────────────╔════╗──────╔╗
║╔══╝─────║║──────────────║╔╗╔╗║──────║║
║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗╚╝║║╠╩╦══╦══╣║╔╦══╦═╗
║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣──║║║╔╣╔╗║╔═╣╚╝╣║═╣╔╝
║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣──║║║║║╔╗║╚═╣╔╗╣║═╣║
╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝──╚╝╚╝╚╝╚╩══╩╝╚╩══╩╝
───────║║──────╔═╝║
───────╚╝──────╚══╝`)
}




displayTextArt()
menu()







