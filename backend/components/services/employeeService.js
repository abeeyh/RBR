const Employee = require('../models/Employee');

async function getAllEmployees() {
    return await Employee.find();
}

async function getEmployeeById(id) {
    return await Employee.findById(id);
}

async function createEmployee(data) {
    const employee = new Employee(data);
    return await employee.save();
}

async function updateEmployee(id, data) {
    const employee = await Employee.findById(id);
    if (!employee) {
        throw new Error('Funcionário não encontrado');
    }
    Object.assign(employee, data);
    return await employee.save();
}

async function deleteEmployee(id) {
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Funcionário não encontrado');
    }
    return;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
