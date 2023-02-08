import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserAvatar from '../components/UserAvatar';
import { sendTodo } from '../redux/addTodoReducer/actions';

const AddTodo = () => {
  const [input, setInput] = useState({
    title: '',
    isCompleted: false,
    priority: 'Urgent',
  });
  const dispatch = useDispatch();
  const toast = useToast();

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const isError = input.title === '';

  const handleTodoClick = e => {
    dispatch(sendTodo(input)).then(res => {
      const { data, response } = res.payload;
      const status = data?.status || response.data.status;
      const message = data?.message || response.data.message;
      switch (status) {
        case 'success':
          return toast({
            title: 'Todo created successfully.',
            description: `${message}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        case 'warning':
          return toast({
            title: 'Login required.',
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
    <Stack paddingBottom={'20em'} pos={'relative'}>
      <Box h={'6em'}></Box>
      <Box
        pos={'absolute'}
        bottom={'75%'}
        left={'50vw'}
        right={'50vw'}
        zIndex={100}
      >
        <UserAvatar />
      </Box>
      <Box h={'10em'} bg={'#e40980'} pos={'relative'}>
        <Center>
          <Container
            bg={'#fff'}
            borderRadius={'0.5rem'}
            boxShadow={'0px 0px 10px 1px rgba(125, 125, 125, 0.25)'}
            pos={'absolute'}
            top={'50%'}
          >
            <Heading>{input.title}</Heading>
            <FormControl isInvalid={isError}>
              <FormLabel>Add Todo</FormLabel>
              <Input
                type={'text'}
                name="title"
                value={input.title}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the todo you'd like to do at the earliest.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Todo is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Select Priority</FormLabel>
              <Select name="priority" onChange={handleInputChange}>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Select Status</FormLabel>
              <Select name="isCompleted" onChange={handleInputChange}>
                <option value={false}>Not Completed</option>
                <option value={true}>Completed</option>
              </Select>
            </FormControl>

            <FormControl display={'grid'} placeItems={'center'} py={'1rem'}>
              <Button
                color={'#e40980'}
                colorScheme={'purple'}
                _hover={{ backgroundColor: '#e40980', color: '#fff' }}
                variant={'outline'}
                onClick={handleTodoClick}
                isDisabled={input.title === ''}
              >
                Add Todo
              </Button>
            </FormControl>
          </Container>
        </Center>
      </Box>
    </Stack>
  );
};

export default AddTodo;
