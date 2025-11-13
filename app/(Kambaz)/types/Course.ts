export interface Course {
  _id: string; // required
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description: string;
  author?: string;
  image?: string;
}
