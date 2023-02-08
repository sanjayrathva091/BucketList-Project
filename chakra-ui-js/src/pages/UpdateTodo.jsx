import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../components/TodoItem';
import UserAvatar from '../components/UserAvatar';
import { fetchSingleTodo } from '../redux/getSingleTodoReducer/actions';
import { editTodo } from '../redux/editTodoReducer/actions';

const UpdateTodo = () => {
  const params = useParams();
  const todo = useSelector(store => store.getSingleTodoReducer.todo);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [input, setInput] = useState({
    title: '',
    isCompleted: false,
    priority: 'Urgent',
  });

  const isError = input.title === '';

  useEffect(() => {
    dispatch(fetchSingleTodo(params)).then(res => {
      const { data, response } = res.payload;
      const status = data?.status || response?.data.status;
      const message = data?.message || response?.data.message;

      switch (status) {
        case 'success':
          return toast({
            title: 'Todo fetched successfully.',
            description: `${message}`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        case 'warning':
          return toast({
            title: `${message}`,
            description: `Login required.`,
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
        default:
          return toast({
            title: 'Error',
            description: `${message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
      }
    });

    todo && setInput({ ...input, ...todo });
  }, [dispatch, params, toast, input, todo]);

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const onClickSaveHandler = () => {
    dispatch(editTodo(params, input)).then(res => {
      const { data, response } = res.payload;
      const status = data?.status || response?.data.status;
      const message = data?.message || response?.data.message;
      dispatch(fetchSingleTodo(params));
      switch (status) {
        case 'success':
          return toast({
            title: 'Todo updated successfully.',
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
    <Stack pos={'relative'}>
      <Box h={'6em'}></Box>
      <Box
        pos={'absolute'}
        bottom={'50%'}
        left={'50vw'}
        right={'50vw'}
        zIndex={100}
      >
        <UserAvatar />
      </Box>
      <Box h={'10em'} bg={'#e40980'} pos={'relative'}>
        <Center>
          <Container
            maxW="4xl"
            bg={'#fff'}
            borderRadius={'0.5rem'}
            pos={'absolute'}
            top={'50%'}
          >
            <TableContainer>
              <Table
                variant="striped"
                bg={'#fff'}
                color="#E40980"
                colorScheme="gray"
              >
                <TableCaption>Your Todo Bucket List</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>Sr. No.</Th>
                    <Th>Todo Name</Th>
                    <Th>Status</Th>
                    <Th>Priority</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todo ? (
                    <TodoItem index={0} {...todo} onEdit={onOpen} />
                  ) : (
                    <Tr>
                      <Td colSpan={6} textAlign={'center'}>
                        No Todos Available.
                      </Td>
                    </Tr>
                  )}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th isNumeric>Sr. No.</Th>
                    <Th>Todo Name</Th>
                    <Th>Status</Th>
                    <Th>Priority</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Container>
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isError}>
              <FormLabel>Edit Todo</FormLabel>
              <Input
                type={'text'}
                name="title"
                value={input.title}
                onChange={handleInputChange}
                isRequired
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
              <Select name="priority" onChange={handleInputChange} isRequired>
                <option value={todo && todo.priority}>Select Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Select Status</FormLabel>
              <Select name="isCompleted" onChange={handleInputChange}>
                <option value="">Select Status</option>
                <option value={false}>Not Completed</option>
                <option value={true}>Completed</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                onClickSaveHandler();
              }}
              isDisabled={input.title === ''}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default UpdateTodo;
