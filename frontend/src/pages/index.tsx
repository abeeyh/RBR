import { Box, Container, Heading, Text, Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import NavBar from "../components/molecules/navbar/NavBar";

export default function Home() {
  return (
    <Box>
      <NavBar />
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" py={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Bem-Vindo!
          </Heading>
          <Text fontSize="xl" mb={8}>
            Uma introdução ao sistema de manutenção de funcionários.
          </Text>
          <Flex justifyContent="center" gap={4}>
            <Button
              colorScheme="blue"
              size="lg"
              as={NextLink}
              href="/register-employee"
            >
              Cadastro de Funcionários
            </Button>
            <Button
              colorScheme="green"
              size="lg"
              as={NextLink}
              href="/view-employees"
            >
              Visualização de Funcionários
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
