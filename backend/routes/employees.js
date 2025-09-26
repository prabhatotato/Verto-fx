
const express = require('express');
const { 
    getEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require('../controllers/employeeController'); // Destructure all controller functions

const employeeRouter = express.Router();

// GET / - Fetch ALL employees
employeeRouter.get('/', getEmployees);

// GET /:id - Fetch a single employee
employeeRouter.get('/:id', getEmployeeById);

// POST / - Create a new employee
employeeRouter.post('/', createEmployee);

// PUT /:id - Update an employee
employeeRouter.put('/:id', updateEmployee);

// DELETE /:id - Delete an employee
employeeRouter.delete('/:id', deleteEmployee);


module.exports = employeeRouter;