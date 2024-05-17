import { Box, Container, Heading } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import NavBar from "@/components/molecules/navbar/NavBar";
import EmployeeForm from "@/components/molecules/EmployeeForm/EmployeeForm";
import Employee from "@/Types/Employee/Employee";
import { useSnackbar } from "@/utils/context/SnackBar/SnackBar";
import { createEmployee } from "@/utils/services/EmployeeService";

const initialValues: Employee = {
  name: "",
  position: "",
  department: "",
  dateOfHire: "",
  _id: undefined
};

const RegisterEmployee = () => {
  const { showSuccess, showError } = useSnackbar();

  const handleSubmit = async (
    values: Employee,
    { resetForm }: FormikHelpers<Employee>
  ) => {
    try {
      await createEmployee(values);
      showSuccess("Funcionário criado com sucesso!");
      resetForm();
    } catch (error) {
      showError("Falha ao criar funcionário.");
    }
  };

  return (
    <Box>
      <NavBar />
      <Container maxW="container.md" py={10}>
        <Heading as="h2" size="xl" mb={6}>
          Cadastro de Funcionários
        </Heading>
        <EmployeeForm onSubmit={handleSubmit} initialValues={initialValues} />
      </Container>
    </Box>
  );
};

export default RegisterEmployee;
