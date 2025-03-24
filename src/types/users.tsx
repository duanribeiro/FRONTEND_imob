export type UserState = {
    email: string | null;
    customer_id: string | null;
    subscription_status: string | null;
}
  
export type UserAction =
  | { type: "SET_USER"; payload: UserState }
  | { type: "CLEAR_USER" };