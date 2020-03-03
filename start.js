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
      'Update employee Role',
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
        case 'Update employee Role':
          updateEmployeeRole()
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
    if (err) throw err
    roles.forEach(elem => { roleChoises.push(elem.title)})
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
  .then(function({firstName, lastName, roles, manager}){
    let roleid
    for (i = 0; i < roleChoises.length; i++){
      if (roleChoises[i] === roles){
        roleid = i+1
      }
    }
    
    let manager_id
    for (i = 0; i < managerChoises.length; i++){
      if (managerChoises[i] === manager){
        managerid = i+1
      }
    }
    db.query(`INSERT INTO employee SET ?`, {
      first_name: firstName,
      last_name: lastName,
      role_id: roleid,
      manager_id: managerid,
    }, (err) => {
        if (err) throw err
        console.log('Employee created')
        menu()
     })
  })
    
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

function updateEmployeeRole() {

  console.log('This is the function to update employee role')
  menu()
  
  // db.query('SELECT * FROM employee', (err, items) => {
  //   if (err) throw err
  //   let itemArrayOne = []
  //   items.forEach(element => {
  //     itemArrayOne.push(`${element.first_name} ${element.last_name}`)
  //   })
  // })

  // inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'name',
  //     choises: itemArrayOne,
  //     message: 'Who is the employee to update?'
  //   }
  // ])
  



}

function deleteEmployee() {
  
  let empChoices = []
  db.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee`, (err, emp) => {
    if (err) throw err
    emp.forEach(elem => { empChoices.push(`${elem.first_name} ${elem.last_name}`) })
    // empChoices = emp.map(({id, first_name, last_name})=>({
    //   value: id, name: `${id} ${first_name} ${last_name}`
    // }))
    // console.table(emp)

  
  })
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'empId',
      message: 'Press Emter'
    },
    {
      type: 'list',
      name: 'empToDel',
      message: 'Choose which employee will be deleted',
      choices: empChoices
    }
  ])
  .then(function ({empToDel}){
    let empId
    for (i = 0; i < empChoices.length; i++) {
      if (empChoices[i] === empToDel) {
        empId = i + 1
      }
    }
    db.query(`DELETE FROM employee WHERE ?`, { id: empId}, err => {
      if (err) throw err
      console.log('Employee deleted')
      menu()
    })
  })

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







