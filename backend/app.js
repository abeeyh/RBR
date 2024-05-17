const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./components/routes/employeeRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(bodyParser.json());
app.use("/api/employees", employeeRoutes);

mongoose
  .connect("mongodb://localhost:27017/employeeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Não foi possível conectar ao MongoDB", err));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Funcionários",
      version: "1.0.0",
      description: "API para gestão de funcionários",
    },
  },
  apis: ["./components/routes/*.js", "./components/models/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
