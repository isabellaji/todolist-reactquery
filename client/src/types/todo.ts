export interface RequestTodo {
  title: string;
  content: string;
}

export interface ResponseTodo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
