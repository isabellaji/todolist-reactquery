import React from 'react';
import { todoAPI } from 'apis/todo';
import { RequestTodoWId, ResponseTodo } from 'types/todo';
import { Container } from './style';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ListItemProps {
  todo: ResponseTodo;
  path?: string;
  setEditTodo: (v: RequestTodoWId) => void;
  setIsEdit: (v: boolean) => void;
  setModalVisivle: (v: boolean) => void;
}

export const ListItem = React.memo((props: ListItemProps) => {
  const { todo, path, setEditTodo, setIsEdit, setModalVisivle } = props;
  const queryClient = useQueryClient();

  const deleteTodo = async (id: string) => {
    try {
      await todoAPI.delete(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error);
      }
    }
  };

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleDeleteTodo = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteMutation.mutate(id);
  };

  const handleEditTodo = (todo: RequestTodoWId) => {
    setEditTodo(todo);
    setIsEdit(true);
    setModalVisivle(true);
  };

  return (
    <Container isClicked={path === todo.id ? true : false}>
      <Link to={`/${todo.id}`}>{todo.title}</Link>
      <div className="item__utils">
        <button
          className="edit__btn"
          onClick={() => handleEditTodo({ id: todo.id, title: todo.title, content: todo.content })}
        >
          ✏️
        </button>
        <button className="remove__btn" onClick={(e) => handleDeleteTodo(todo.id, e)}>
          ❎
        </button>
      </div>
    </Container>
  );
});
