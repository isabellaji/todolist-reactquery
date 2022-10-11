import { todoAPI } from 'apis/todo';
import { RequestTodo, RequestTodoWId } from 'types/todo';
import { CloseBtn, Container, Form } from './style';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface ModalProps {
  modalVisible: boolean;
  setModalVisivle: (v: boolean) => void;
  currentTodo: RequestTodoWId;
  isEdit: boolean;
  setIsEdit: (v: boolean) => void;
}

export const Modal = ({
  modalVisible,
  setModalVisivle,
  currentTodo,
  isEdit,
  setIsEdit,
}: ModalProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm<RequestTodo>();

  const createTodo = async (newTodo: RequestTodo) => {
    try {
      const newData = await todoAPI.create(newTodo);
      return newData;
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error);
      }
    } finally {
      handleCloseModal();
    }
  };

  const CreateMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const updateTodo = async (newTodo: RequestTodoWId) => {
    try {
      const newData = await todoAPI.update(newTodo);
      return newData;
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error);
      }
    } finally {
      handleCloseModal();
    }
  };

  const UpdateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleCloseModal = () => {
    setModalVisivle(false);
    setIsEdit(false);
    setValue('title', '');
    setValue('content', '');
  };

  const onValid = ({ title, content }: RequestTodo) => {
    if (isEdit) {
      UpdateMutation.mutate({ title, content, id: currentTodo.id });
      setIsEdit(false);
    } else {
      CreateMutation.mutate({ title, content });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setValue('title', currentTodo.title);
      setValue('content', currentTodo.content);
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
