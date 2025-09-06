import type { UserPayload, CreateUserResponse, User } from "@/types/fetchUsersTypes";
import { apiRequest } from "../../axiosConfig";

export const createUser = (userData: UserPayload): Promise<CreateUserResponse> => {
    return apiRequest<CreateUserResponse>('/users', 'POST', userData);
};

export const fetchUsers = (): Promise<User[]> => {
    return apiRequest<User[]>('/users', 'GET');
};

export const getUserById = (id: number): Promise<User> => {
    return apiRequest<User>(`/users/${id}`, "GET");
};
export const updateUser = (id: number, data: UserPayload): Promise<void> => {
    return apiRequest<void>(`/users/${id}`, "PUT", data);
};

export const deleteUser = (id: number): Promise<void> => {
    return apiRequest<void>(`/users/${id}`, "DELETE");
};