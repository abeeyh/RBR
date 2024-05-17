const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Retorna uma lista de todos os funcionários.
 *     responses:
 *       200:
 *         description: Lista de todos os funcionários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/', async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Retorna um funcionário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Detalhes de um funcionário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Funcionário não encontrado.
 */
router.get('/:id', async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Cria um novo funcionário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Funcionário criado.
 */
router.post('/', async (req, res) => {
    try {
        const newEmployee = await employeeService.createEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Atualiza um funcionário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Funcionário atualizado.
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Deleta um funcionário pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.delete('/:id', async (req, res) => {
    try {
        await employeeService.deleteEmployee(req.params.id);
        res.json({ message: 'Funcionário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
