import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import NavBar from "@/components/molecules/navbar/NavBar";
import { FormikHelpers } from "formik";
import {
  getEmployeeById,
  updateEmployee,
} from "@/utils/services/EmployeeService";
import { useSnackbar } from "@/utils/context/SnackBar/SnackBar";
import Employee from "@/Types/Employee/Employee";
import EmployeeForm from "@/components/molecules/EmployeeForm/EmployeeForm";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = router.query;
  const { showSuccess, showError } = useSnackbar();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const data = await getEmployeeById(id);
          const formattedData = {
            ...data,
            dateOfHire: new Date(data.dateOfHire).toISOString().split("T")[0],
          };
          setEmployee(formattedData);
        } catch (error) {
          showError("Failed to fetch employee data");
        }
      };

      fetchEmployee();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (
    values: Employee,
    { setSubmitting }: FormikHelpers<Employee>
  ) => {
    try {
      if (id) {
        await updateEmployee(id, values);
        showSuccess("Funcionário atualizado com sucesso!");
        router.push("/view-employees");
      }
    } catch (error) {
      showError("Funcionário não atualizado. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <NavBar />
      <Container maxW="container.md" py={10}>
        <Heading as="h2" size="xl" mb={6}>
          Editar Funcionário
        </Heading>
        <EmployeeForm initialValues={employee} onSubmit={handleSubmit} />
      </Container>
    </Box>
  );
};

export default EditEmployee;
