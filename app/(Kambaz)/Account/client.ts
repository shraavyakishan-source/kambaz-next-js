import axios from "axios";
import { User } from "../types/Account";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// --- Type Definitions ---
export interface SigninCredentials {
  username: string;
  password: string;
}

// --- API Functions ---

// --- GET all users ---
export const findAllUsers = async (): Promise<User[]> => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

// Sign in
export const signin = async (credentials: SigninCredentials): Promise<User> => {
  const trimmed = {
    username: credentials.username.trim(),
    password: credentials.password.trim(),
  };
  console.log("Attempting signin with:", credentials);

  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    trimmed
  );
  return response.data;
};

// Sign up
export const signup = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

// Update user
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

// Get current profile
export const profile = async (): Promise<User> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

// Sign out
export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

// FIXED: This was missing withCredentials
export const findUserById = async (id: string) => {
  console.log("Client: Finding user by ID:", id);
  console.log("Client: Using URL:", `${USERS_API}/${id}`);

  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  console.log("Client: Response received:", response.data);

  return response.data;
};

// FIXED: This was missing withCredentials
export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};
