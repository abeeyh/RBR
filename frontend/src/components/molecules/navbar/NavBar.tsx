import { 
    Box, 
    Flex, 
    Stack, 
    useColorMode, 
    useColorModeValue, 
    IconButton, 
    Image 
  } from '@chakra-ui/react';
  import { FaSun, FaMoon, FaGithub, FaLinkedin } from 'react-icons/fa';
  import NextLink from 'next/link';
  
  const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('black', 'white');
  
    return (
      <Box bg={bg} color={color} px={4} shadow="md">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontSize="xl" fontWeight="bold">
            <NextLink href="/">
              <Image 
                src="https://avatars.githubusercontent.com/u/38567527?s=400&u=0dc65110d7fa1451f25412f0528236d7d3e8c845&v=4" 
                alt="Logo" 
                boxSize="40px" 
                borderRadius="full" 
              />
            </NextLink>
          </Box>
          <Flex alignItems="center">
            <Stack direction="row" spacing={2}>
              <IconButton
                as="a"
                href="https://github.com/abeeyh"
                aria-label="GitHub"
                icon={<FaGithub />}
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/gabriel-messina-a2a29b17a/"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
              />
              <IconButton
                aria-label="Toggle Color Mode"
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    );
  };
  
  export default NavBar;
  