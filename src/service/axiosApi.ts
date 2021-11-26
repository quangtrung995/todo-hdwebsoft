import axios from 'axios';

//constant
import { BACKEND_URL } from '../constant'

//interface
import { ITodoData } from '../utils/todo';

const repository = axios.create({
    baseURL: BACKEND_URL
});



    export const getAll = (): Promise<any> => {
        const response = repository.get(`todo`).then(res => res.data);
        return response
    };

    export const getOneById = (id: string) => {
        const response = repository.get(`todo/${id}`).then(res => res.data)
        return response
    }

    export const updateOne = ({id, ...data}: ITodoData): Promise<any> => {
        const response = repository.put(`todo/${id}`, data).then(res => res.data)
        return response
    }

    export const deleteOne = (id: any): Promise<any> => {
        const response = repository.delete(`todo/${id}`).then(res => res.data)
        return response
    }

    export const getWithQueryPage = (query: {page: number, limit?: number}): Promise<any> => {
        const response = repository.get(`todo$page=${query.page}&limit=${query.limit ? query.limit : 5}`).then(res => res.data)
        return response
    }
