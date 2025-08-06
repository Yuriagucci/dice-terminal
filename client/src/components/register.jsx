
import { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, Alert, AlertIcon, Link, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const registerData = await res.json();
      if (registerData.success) {
        setSuccess('Registration successful!');
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(registerData.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={6}>Register</Heading>
      <form onSubmit={handleRegister}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </FormControl>
        {error && <Alert status="error" mb={4}><AlertIcon />{error}</Alert>}
        {success && <Alert status="success" mb={4}><AlertIcon />{success}</Alert>}
        <Button colorScheme="teal" type="submit" w="full" isLoading={loading}>
          Register
        </Button>
      </form>

      <Flex mt={6} align="center" justify="center">
        <Link as={RouterLink} to="/" color="teal.500" fontWeight="bold">
          Sign in
        </Link>
      </Flex>
    </Box>
  );
}

export default Register;
