import { RequestLoading } from "../enums/RequestLoadingEnum";

export interface IRequestState {
  loading: RequestLoading;
  currentRequestId: null | string;
}
