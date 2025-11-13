import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

// --- Type Definitions ---
export type Assignment = {
  id?: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
};

// --- API Functions ---

// Fetch welcome message
export const fetchWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

// Fetch assignment
export const fetchAssignment = async (): Promise<Assignment> => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/assignment`);
  return response.data;
};

// Update assignment title
export const updateTitle = async (title: string): Promise<Assignment> => {
  const response = await axios.put(
    `${HTTP_SERVER}/lab5/assignment/title/${title}`
  );
  return response.data;
};

// Fetch todo by ID
export const fetchTodoById = async (id: number): Promise<Todo> => {
  const response = await axios.get(`${TODOS_API}/${id}`);
  return response.data;
};

// Fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

// Create a new todo
export const createTodo = async (todo: {
  title: string;
  completed: boolean;
}): Promise<Todo> => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (
  id: number,
  updates: Partial<Pick<Todo, "title" | "completed">>
): Promise<Todo> => {
  const response = await axios.put(`${TODOS_API}/${id}`, updates);
  return response.data;
};

// Post a new todo (alternative)
export const postNewTodo = async (todo: {
  title: string;
  completed: boolean;
}): Promise<Todo> => {
  const response = await axios.post(TODOS_API, todo);
  return response.data;
};

// Delete a todo
export const removeTodo = async (id: number): Promise<void> => {
  await axios.delete(`${TODOS_API}/${id}`);
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${TODOS_API}/${id}`);
};
