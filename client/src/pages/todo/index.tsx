import React, { useEffect, useState } from 'react';
import { ListItem, Modal } from 'components';
import { RequestTodoWId, ResponseTodo } from 'types/todo';
import { todoAPI } from 'apis/todo';
import { MainLayout } from 'layouts';
import { Container, CreateBtn, DescriptionSection, ListSection, Loader } from './style';
import { useQuery } from '@tanstack/react-query';
import { useMatch, useNavigate } from 'react-router-dom';

export const TodoPage = () => {
  const match = useMatch('/*');
  const path = match?.params['*'];
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<RequestTodoWId>();
  const [modalVisible, setModalVisivle] = useState(false);
  const { data, isLoading } = useQuery<ResponseTodo[]>(['todos'], todoAPI.get);
  const { data: currentTodo } = useQuery<ResponseTodo>(
    ['todo', path],
    () => todoAPI.getById(path),
    { enabled: !!path }
  );

  const handleOpenModal = () => {
    setModalVisivle(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('todos');
    !token && navigate('/auth/signin');
  }, [navigate]);

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
                  key={todo.id}
                  todo={todo}
                  path={path}
                  setEditTodo={setEditTodo}
                  setIsEdit={setIsEdit}
                  setModalVisivle={setModalVisivle}
                />
              ))
            )}
          </ul>
        </ListSection>
        <DescriptionSection>
          <h2>Description</h2>
          {currentTodo && <pre className="description__item">{currentTodo.content}</pre>}
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
