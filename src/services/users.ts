import type { CreateUserRequest, CreateUserResponse, Root } from "@/types/fetchUsersTypes";
import { apiRequest } from "../../axiosConfig";

export const createUser = async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    return await apiRequest<CreateUserResponse>('/users', 'POST', userData);
};

export const fetchUsers = async (): Promise<Root[]> => {
    return await apiRequest<Root[]>('/users', 'GET');
};

export const deleteUser = async (id: number): Promise<void> => {
    return await apiRequest<void>(`/users/${id}`, "DELETE");
};