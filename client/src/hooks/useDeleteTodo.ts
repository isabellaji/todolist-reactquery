import { todoAPI } from 'apis/todo';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTodo = (key: string) => {
  const queryClient = useQueryClient();

  const mutationFn = async (id: string) => {
    try {
      return await todoAPI.delete(id);
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
  });

  return {
    mutate: mutation.mutate,
  };
};
