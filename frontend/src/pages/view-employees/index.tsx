import {
    Box,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Input,
    Select,
    Stack,
  } from "@chakra-ui/react";
  import { useState, useEffect, Key } from "react";
  import NavBar from "@/components/molecules/navbar/NavBar";
  import { Position } from "@/utils/enum/Position";
  import { Department } from "@/utils/enum/Department";
  import Employee from "@/Types/Employee/Employee";
  import { useRouter } from 'next/router';
import { deleteEmployee, getEmployees } from "@/utils/services/EmployeeService";
import { formatDate } from "@/utils/dateFormatter/dateFormater";
  
  const ViewEmployees = () => {
    const router = useRouter();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filters, setFilters] = useState({
      name: "",
      position: "",
      department: "",
      dateOfHire: "",
    });
  
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };
  
    const handleFilterChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };
  
    const handleDelete = async (id: Key) => {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error(`Failed to delete employee with ID: ${id}`, error);
      }
    };
  
    const handleEdit = (id: Key) => {
      router.push(`/edit-employee?id=${id}`);
    };
  
    const filteredEmployees = employees.filter((employee) => {
      return (
        (filters.name === "" ||
          employee.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.position === "" || employee.position === filters.position) &&
        (filters.department === "" ||
          employee.department === filters.department) &&
        (filters.dateOfHire === "" || employee.dateOfHire === filters.dateOfHire)
      );
    });
  
    return (
      <Box>
        <NavBar />
        <Container maxW="container.xl" py={10}>
          <Heading as="h2" size="xl" mb={6}>
            Visualização de Funcionários
          </Heading>
          <Stack direction="row" spacing={4} mb={6}>
            <Input
              placeholder="Nome"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <Select
              placeholder="Cargo"
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
            >
              {Object.values(Position).map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Departamento"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              {Object.values(Department).map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Data de Admissão"
              name="dateOfHire"
              type="date"
              value={filters.dateOfHire}
              onChange={handleFilterChange}
            />
          </Stack>
          <Box overflowX="auto">
            <Table variant="simple">
              <TableCaption>Lista de Funcionários</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Cargo</Th>
                  <Th>Departamento</Th>
                  <Th>Data de Admissão</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredEmployees.map((employee) => (
                  <Tr key={employee._id}>
                    <Td>{employee.name}</Td>
                    <Td>{employee.position}</Td>
                    <Td>{employee.department}</Td>
                  <Td>{formatDate(employee.dateOfHire)}</Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        mr={2}
                        onClick={() => handleEdit(employee._id!)}
                      >
                        Editar
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(employee._id!)}
                      >
                        Excluir
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default ViewEmployees;
  