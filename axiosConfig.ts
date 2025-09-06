import axios, { type AxiosResponse } from "axios"

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiRequest = async <T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: unknown): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        method,
        url,
        data,
    });

    return response.data;
};