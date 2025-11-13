import axios from "axios";
import { User } from "../types/Account";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// --- Type Definitions ---
export interface SigninCredentials {
  email: string;
  password: string;
}

// --- API Functions ---

// Sign in
export const signin = async (credentials: SigninCredentials): Promise<User> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

// Sign up
export const signup = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

// Update user
export const updateUser = async (user: User): Promise<User> => {
  if (!user._id) throw new Error("User ID is required to update");
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
