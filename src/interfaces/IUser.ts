export interface IUser {
  created_at: string;
  email: string;
  first_name: string;
  isCustomer: boolean;
  last_name: string;
  role: "admin" | "user" | "owner";
  status: number;
  _id: string;
}
