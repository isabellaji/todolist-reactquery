import { Modal } from 'components';
import { RequestTodoWId, ResponseTodo } from 'types/todo';
import { todoAPI } from 'apis/todo';
import { MainLayout } from 'layouts';
import { Container, CreateBtn, DescriptionSection, ListItem, ListSection, Loader } from './style';
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useMatch } from 'react-router-dom';

export const TodoPage = () => {
  const match = useMatch('/*');
  const path = match?.params['*'];
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<RequestTodoWId>();
  const [modalVisible, setModalVisivle] = useState(false);
  const { data, isLoading: todoListLoading } = useQuery<ResponseTodo[]>(['todos'], todoAPI.get);
  const { data: currentTodo, isLoading: todoItemLoading } = useQuery<ResponseTodo>(
    ['todo', path],
    () => todoAPI.getById(path)
  );
  const isLoading = todoListLoading || todoItemLoading;

  const handleOpenModal = () => {
    setModalVisivle(true);
  };

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
    <MainLayout>
      <Container>
        <ListSection>
          <CreateBtn onClick={handleOpenModal}>+</CreateBtn>
          <ul className="list__wrapper">
            {isLoading ? (
              <Loader>Loading...🌀</Loader>
            ) : (
              data?.map((todo) => (
                <ListItem
                  className="list__item"
                  key={todo.id}
                  isClicked={path === todo.id ? true : false}
                >
                  <Link to={`/${todo.id}`}>{todo.title}</Link>
                  <div className="item__utils">
                    <button
                      className="edit__btn"
                      onClick={() =>
                        handleEditTodo({ id: todo.id, title: todo.title, content: todo.content })
                      }
                    >
                      ✏️
                    </button>
                    <button className="remove__btn" onClick={(e) => handleDeleteTodo(todo.id, e)}>
                      ❎
                    </button>
                  </div>
                </ListItem>
              ))
            )}
          </ul>
        </ListSection>
        <DescriptionSection>
          <h2>Description</h2>
          {isLoading ? (
            <Loader>Loading...🌀</Loader>
          ) : (
            currentTodo && <pre className="description__item">{currentTodo.content}</pre>
          )}
        </DescriptionSection>
      </Container>
      <Modal
        modalVisible={modalVisible}
        setModalVisivle={setModalVisivle}
        editTodo={editTodo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </MainLayout>
  );
};
