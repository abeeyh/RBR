const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./employeeRoutes');
const employeeService = require('../services/employeeService');

jest.mock('../services/employeeService');

const app = express();
app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes);

describe('Employee Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/employees - success', async () => {
        employeeService.getAllEmployees.mockResolvedValue([{ name: 'John Doe', position: 'Developer' }]);
        const response = await request(app).get('/api/employees');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ name: 'John Doe', position: 'Developer' }]);
        expect(employeeService.getAllEmployees).toHaveBeenCalled();
    });

    test('GET /api/employees/:id - success', async () => {
        employeeService.getEmployeeById.mockResolvedValue({ name: 'John Doe', position: 'Developer' });
        const response = await request(app).get('/api/employees/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ name: 'John Doe', position: 'Developer' });
        expect(employeeService.getEmployeeById).toHaveBeenCalledWith('1');
    });

    test('POST /api/employees - success', async () => {
        employeeService.createEmployee.mockResolvedValue({ name: 'New Employee', position: 'Manager' });
        const response = await request(app).post('/api/employees').send({ name: 'New Employee', position: 'Manager' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ name: 'New Employee', position: 'Manager' });
        expect(employeeService.createEmployee).toHaveBeenCalledWith({ name: 'New Employee', position: 'Manager' });
    });

    test('PUT /api/employees/:id - success', async () => {
        employeeService.updateEmployee.mockResolvedValue({ name: 'Updated Employee', position: 'Manager' });
        const response = await request(app).put('/api/employees/1').send({ name: 'Updated Employee', position: 'Manager' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ name: 'Updated Employee', position: 'Manager' });
        expect(employeeService.updateEmployee).toHaveBeenCalledWith('1', { name: 'Updated Employee', position: 'Manager' });
    });

    test('DELETE /api/employees/:id - success', async () => {
        employeeService.deleteEmployee.mockResolvedValue({});
        const response = await request(app).delete('/api/employees/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Funcionário deletado com sucesso' });
        expect(employeeService.deleteEmployee).toHaveBeenCalledWith('1');
    });
});
