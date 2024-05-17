import { Department } from "@/utils/enum/Department";
import { Position } from "@/utils/enum/Position";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import validationSchema from "./ValidationSchema";
import Employee from "@/Types/Employee/Employee";

const EmployeeForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: Employee,
  onSubmit: (
    values: Employee,
    actions: FormikHelpers<Employee>
  ) => void;
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={!!errors.name && touched.name}>
                <FormLabel>Nome</FormLabel>
                <Field
                  as={Input}
                  type="text"
                  name="name"
                  placeholder="Nome do Funcionário"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </FormControl>
              <FormControl
                id="position"
                isInvalid={!!errors.position && touched.position}
              >
                <FormLabel>Cargo</FormLabel>
                <Field
                  as={Select}
                  name="position"
                  placeholder="Selecione o Cargo"
                >
                  {Object.values(Position).map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="position"
                  component="div"
                  className="error-message"
                />
              </FormControl>
              <FormControl
                id="department"
                isInvalid={!!errors.department && touched.department}
              >
                <FormLabel>Departamento</FormLabel>
                <Field
                  as={Select}
                  name="department"
                  placeholder="Selecione o Departamento"
                >
                  {Object.values(Department).map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  className="error-message"
                />
              </FormControl>
              <FormControl
                id="dateOfHire"
                isInvalid={!!errors.dateOfHire && touched.dateOfHire}
              >
                <FormLabel>Data de Admissão</FormLabel>
                <Field as={Input} type="date" name="dateOfHire" />
                <ErrorMessage
                  name="dateOfHire"
                  component="div"
                  className="error-message"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                {initialValues._id ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EmployeeForm;
