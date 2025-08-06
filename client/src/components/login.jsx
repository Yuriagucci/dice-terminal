import { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, Alert, AlertIcon, Link, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const loginData = await loginRes.json();
      if (loginData.success) {
        localStorage.setItem('diceToken', 'true');
        localStorage.setItem("userId", loginData.userId);
        localStorage.setItem("name", loginData.name);
        navigate('/dice-roller'); // remove state — you're now using localStorage instead
      } else {
        setError(loginData.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={6}>Dice Terminal</Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </FormControl>
        {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
        <Button colorScheme="teal" type="submit" w="full" isLoading={loading}>Login</Button>
      </form>
      <Flex mt={6} align="center" justify="center">
        <AddIcon boxSize={5} color="teal.500" mr={2} />
        <Link as={RouterLink} to="/register" color="teal.500" fontWeight="bold">
          Don't have an account? Register
        </Link>
      </Flex>
    </Box>
  );
}

export default login;
