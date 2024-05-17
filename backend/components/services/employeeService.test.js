const mongoose = require('mongoose');
const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('./employeeService');
const Employee = require('../models/Employee');

const testEmployee = {
    name: "Test Employee",
    position: "Desenvolvedor",
    department: "TI",
    dateOfHire: new Date()
};

describe("Employee Service", () => {
    test("should create an employee", async () => {
        const createdEmployee = await createEmployee(testEmployee);
        expect(createdEmployee.name).toBe(testEmployee.name);
    });

    test("should retrieve all employees", async () => {
        await createEmployee(testEmployee);
        const employees = await getAllEmployees();
        expect(employees.length).toBeGreaterThan(0);
    });

    test("should retrieve an employee by id", async () => {
        const createdEmployee = await createEmployee(testEmployee);
        const foundEmployee = await getEmployeeById(createdEmployee._id);
        expect(foundEmployee.name).toBe(testEmployee.name);
    });

    test("should update an employee", async () => {
        const createdEmployee = await createEmployee(testEmployee);
        const updates = { name: "Updated Employee" };
        const updatedEmployee = await updateEmployee(createdEmployee._id, updates);
        expect(updatedEmployee.name).toBe("Updated Employee");
    });

    test("should delete an employee", async () => {
        const createdEmployee = await createEmployee(testEmployee);
        await deleteEmployee(createdEmployee._id);
        const foundEmployee = await getEmployeeById(createdEmployee._id);
        expect(foundEmployee).toBeNull();
    });
});
