import { todoAPI } from 'apis/todo';
import { RequestTodoWId } from 'types/todo';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTodo = (key: string) => {
  const queryClient = useQueryClient();

  const mutationFn = async (newTodo: RequestTodoWId) => {
    try {
      const newData = await todoAPI.update(newTodo);
      return newData;
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error);
      }
    }
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
    onError: (error) => {
      alert(error);
    },
  });

  return {
    mutate: mutation.mutate,
  };
};
