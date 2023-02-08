import {
  Box,
  Center,
  Container,
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
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from '../components/TodoItem';
import UserAvatar from '../components/UserAvatar';
import { fetchTodos } from '../redux/getTodosReducer/actions';

const TodoList = () => {
  const todos = useSelector(store => store.getTodosReducer.todos);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchTodos()).then(res => {
      const { data, response } = res.payload;
      const status = data?.status || response.data.status;
      const message = data?.message || response.data.message;
      switch (status) {
        case 'success':
          return toast({
            title: 'Your todos fetched successfully.',
            description: `${message}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        case 'warning':
          return toast({
            title: 'Login required.',
            description: `${message}`,
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        default:
          return toast({
            title: 'Login failed.',
            description: `${message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
      }
    });
  }, [dispatch, toast]);

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
                  {todos.map((todo, index) => {
                    return <TodoItem key={todo._id} index={index} {...todo} />;
                  })}
                  {todos.length === 0 && (
                    <Tr>
                      <Td colSpan={6} textAlign={'center'}>
                        Please Fill Your Todo Bucket!
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
    </Stack>
  );
};

export default TodoList;
