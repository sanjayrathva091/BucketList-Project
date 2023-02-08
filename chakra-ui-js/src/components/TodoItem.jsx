import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Td,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTodo } from '../redux/deleteTodoReducer/actions';
import { fetchSingleTodo } from '../redux/getSingleTodoReducer/actions';
import { fetchTodos } from '../redux/getTodosReducer/actions';

const TodoItem = ({ index, _id, title, isCompleted, priority, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const onClickEditHandler = id => {
    navigate(`/explorer/update/todo/${id}`);
  };

  const onClickDeleteHandler = id => {
    dispatch(deleteTodo(id)).then(res => {
      const { data, response } = res.payload;
      const status = data?.status || response?.data.status;
      const message = data?.message || response?.data.message;

      dispatch(fetchTodos());
      dispatch(fetchSingleTodo(id));
      switch (status) {
        case 'success':
          return toast({
            title: 'Deleted successfully.',
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
    <>
      <Tr>
        <Td textAlign={'center'}>{index + 1}</Td>
        <Td>{title}</Td>
        <Td>{isCompleted ? 'Completed' : 'Not Completed'}</Td>
        <Td>{priority}</Td>
        <Td
          onClick={() => {
            onEdit && onEdit();
            onEdit || onClickEditHandler(_id);
          }}
        >
          Edit
        </Td>
        <Td onClick={onOpen}>Delete</Td>
      </Tr>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Todo
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClickDeleteHandler({ _id });
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TodoItem;
