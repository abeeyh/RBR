const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - dateOfHire
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do funcionário
 *         position:
 *           type: string
 *           enum: [Gerente, Analista, Desenvolvedor, Suporte]
 *           description: Cargo do funcionário
 *         department:
 *           type: string
 *           enum: [TI, Recursos Humanos, Finanças, Marketing]
 *           description: Departamento do funcionário
 *         dateOfHire:
 *           type: date
 *           description: Data de admissão do funcionário
 *       example:
 *         name: João Silva
 *         position: Desenvolvedor
 *         department: TI
 *         dateOfHire: 2023-05-10
 */

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true, enum: ['Gerente', 'Analista', 'Desenvolvedor', 'Suporte'] },
    department: { type: String, required: true, enum: ['TI', 'Recursos Humanos', 'Finanças', 'Marketing'] },
    dateOfHire: { type: Date, required: true, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
