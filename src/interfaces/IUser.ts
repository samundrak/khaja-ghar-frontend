export interface IUser {
  created_at: string;
  email: string;
  first_name: string;
  isCustomer: boolean;
  last_name: string;
  image: string;
  role: "admin" | "user" | "owner";
  status: number;
  _id: string;
}
