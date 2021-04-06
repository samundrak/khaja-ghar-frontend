import { AuthStateStatus } from "../enums/AuthStateEnum";
import { IRequestState } from "./IRequestState";
import { IUser } from "./IUser";

export interface AuthState extends IRequestState {
  user: IUser | null;
  status: AuthStateStatus;
}
