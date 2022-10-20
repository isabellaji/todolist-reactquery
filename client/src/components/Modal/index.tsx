import React, { useEffect } from 'react';
import { RequestTodo, RequestTodoWId } from 'types/todo';
import { useCreateTodo, useUpdateTodo } from 'hooks';
import { CloseBtn, Container, Form } from './style';
import { useForm } from 'react-hook-form';

interface ModalProps {
  modalVisible: boolean;
  setModalVisivle: (v: boolean) => void;
  editTodo?: RequestTodoWId;
  isEdit: boolean;
  setIsEdit: (v: boolean) => void;
}

export const Modal = ({
  modalVisible,
  setModalVisivle,
  editTodo,
  isEdit,
  setIsEdit,
}: ModalProps) => {
  const { register, handleSubmit, setValue } = useForm<RequestTodo>();
  const createMutation = useCreateTodo('todos');
  const updateMutation = useUpdateTodo('todos');

  const handleCloseModal = () => {
    setModalVisivle(false);
    setIsEdit(false);
    setValue('title', '');
    setValue('content', '');
  };

  const onValid = ({ title, content }: RequestTodo) => {
    if (isEdit && editTodo) {
      updateMutation.mutate({ title, content, id: editTodo?.id });
      setIsEdit(false);
      handleCloseModal();
    } else {
      createMutation.mutate({ title, content });
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isEdit && editTodo) {
      setValue('title', editTodo?.title);
      setValue('content', editTodo?.content);
    }
  }, [isEdit]);

  return (
    <>
      {modalVisible && (
        <Container>
          <div className="form__box">
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register('title', { required: true })}
                type="text"
                autoComplete="off"
                placeholder="Title"
                autoFocus
              />
              <textarea {...register('content', { required: true })} placeholder="Description" />
              <button className="submit__btn">{isEdit ? '수정' : '저장'}</button>
              <CloseBtn onClick={handleCloseModal}>❌</CloseBtn>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
};
