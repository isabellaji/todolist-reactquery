import { todoAPI } from 'apis/todo';
import { RequestTodo } from 'types/todo';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTodo = (key: string) => {
  const queryClient = useQueryClient();

  const mutationFn = async (newTodo: RequestTodo) => {
    try {
      const newData = await todoAPI.create(newTodo);
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
