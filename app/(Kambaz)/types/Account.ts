export interface User {
  _id?: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string; // optional
  dob?: string;
  role?: string;
  loginId?: string; // optional
  section?: string; // optional
  lastActivity?: string; // optional
  totalActivity?: string; // optional
  profilePicture?: string;
}
