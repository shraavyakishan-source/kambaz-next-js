import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};
export const fetchAssignment = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/assignment`);
  return response.data;
};
export const updateTitle = async (title: string) => {
  const response = await axios.put(
    `${HTTP_SERVER}/lab5/assignment/title/${title}`
  );
  return response.data;
};
export const fetchTodoById = async (id: number) => {
  const response = await axios.get(`${TODOS_API}/${id}`);
  return response.data;
};
// ✅ Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

// ✅ Create a new todo (POST)
export const createTodo = async (todo: {
  title: string;
  completed: boolean;
}) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

// ✅ Update a todo (PUT)
export const updateTodo = async (id: number, updates: any) => {
  const response = await axios.put(`${TODOS_API}/${id}`, updates);
  return response.data;
};

export const postNewTodo = async (todo: {
  title: string;
  completed: boolean;
}) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

// ✅ Delete a todo (DELETE)
export const removeTodo = async (id: number) => {
  const response = await axios.delete(`${TODOS_API}/${id}`);
  return response.data;
};
export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${TODOS_API}/${id}`);
  return response.data;
};
