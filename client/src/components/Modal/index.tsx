import { RequestTodo } from 'types/todo';
import { todoAPI } from 'apis/toso';
import { CloseBtn, Container, Form } from './style';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

interface ModalProps {
  modalVisible: boolean;
  onCancle: () => void;
}

export const Modal = ({ modalVisible, onCancle }: ModalProps) => {
  const { register, handleSubmit } = useForm<RequestTodo>();

  const onValid = async ({ title, content }: RequestTodo) => {
    try {
      await todoAPI.create({ title, content });
      onCancle();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error);
      }
    }
  };

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
              <button className="submit__btn">저장</button>
              <CloseBtn onClick={onCancle}>❌</CloseBtn>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
};
