import React from 'react';
import { RequestTodoWId, ResponseTodo } from 'types/todo';
import { useDeleteTodo } from 'hooks';
import { Container } from './style';
import { Link, useNavigate } from 'react-router-dom';

interface ListItemProps {
  todo: ResponseTodo;
  path?: string;
  setEditTodo: (v: RequestTodoWId) => void;
  setIsEdit: (v: boolean) => void;
  setModalVisivle: (v: boolean) => void;
}

export const ListItem = React.memo((props: ListItemProps) => {
  const { todo, path, setEditTodo, setIsEdit, setModalVisivle } = props;
  const navigate = useNavigate();
  const deleteMutation = useDeleteTodo('todos');

  const handleDeleteTodo = (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteMutation.mutate(id);
    navigate('/');
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
