import type { Root } from "@/types/fetchUsersTypes";
import { apiRequest } from "../../axiosConfig";

interface CreateUserRequest {
    name: string;
    email: string;
}

interface CreateUserResponse {
    id: number;
    name: string;
    email: string;
}

export const createUser = async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
    return await apiRequest<CreateUserResponse>('/users', 'POST', userData);
};

export const fetchUsers = async (): Promise<Root[]> => {
    return await apiRequest<Root[]>('/users', 'GET');
};
