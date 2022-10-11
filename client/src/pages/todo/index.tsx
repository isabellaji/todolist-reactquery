import { Modal } from 'components';
import { RequestTodoWId, ResponseTodo } from 'types/todo';
import { todoAPI } from 'apis/todo';
import { todoState } from 'store/atoms';
import { MainLayout } from 'layouts';
import { Container, CreateBtn, DescriptionSection, ListItem, ListSection, Loader } from './style';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useMatch } from 'react-router-dom';

export const TodoPage = () => {
  const match = useMatch('/*');
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisivle] = useState(false);
  const [currentTodo, setCurrentTodo] = useRecoilState<RequestTodoWId>(todoState);
  const resetCurrentTodo = useResetRecoilState(todoState);
  const { data, isLoading } = useQuery<ResponseTodo[]>(['todos'], todoAPI.get);

  const handleOpenModal = () => {
    setModalVisivle(true);
  };

  const handleCurrentTodo = (todo: RequestTodoWId) => {
    setCurrentTodo(todo);
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoAPI.delete(id);
      if (id === currentTodo.id) {
        resetCurrentTodo();
      }
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

  const handleEditTodo = () => {
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
                  isClicked={match?.params['*'] === todo.id ? true : false}
                  // onClick={() =>
                  //   handleCurrentTodo({ id: todo.id, title: todo.title, content: todo.content })
                  // }
                >
                  <Link to={`/${todo.id}`}>{todo.title}</Link>
                  <div className="item__utils">
                    <button className="edit__btn" onClick={() => handleEditTodo()}>
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
          {currentTodo.content && <pre className="description__item">{currentTodo.content}</pre>}
        </DescriptionSection>
      </Container>
      <Modal
        modalVisible={modalVisible}
        setModalVisivle={setModalVisivle}
        currentTodo={currentTodo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </MainLayout>
  );
};
