import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authReducer/actions';

export default function LoginCard() {
  const [user, setUser] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = e => {
    dispatch(loginUser(user)).then(res => {
      const { data, response } = res.payload;
      const status = data?.status || response.data.status;
      const message = data?.message || response.data.message;
      switch (status) {
        case 'success':
          navigate('/');
          return toast({
            title: 'Login successful.',
            description: `${message}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        case 'warning':
          return toast({
            title: 'Login failed.',
            description: `${message}`,
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
        default:
          return toast({
            title: 'Login failed.',
            description: `${message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
      }
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                value={user.email}
                onChange={onChangeHandler}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={user.password}
                onChange={onChangeHandler}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={onSubmitHandler}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
