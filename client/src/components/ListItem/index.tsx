import React from 'react';
import { RequestTodoWId, ResponseTodo } from 'types/todo';
import { Container } from './style';
import { Link } from 'react-router-dom';
import { useDeleteTodo } from 'hooks';

interface ListItemProps {
  todo: ResponseTodo;
  path?: string;
  setEditTodo: (v: RequestTodoWId) => void;
  setIsEdit: (v: boolean) => void;
  setModalVisivle: (v: boolean) => void;
}

export const ListItem = React.memo((props: ListItemProps) => {
  const { todo, path, setEditTodo, setIsEdit, setModalVisivle } = props;
  const deleteMutation = useDeleteTodo('todos');

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
