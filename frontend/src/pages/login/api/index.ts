import axios from 'axios'
import { CustomError } from '@/axios/customError'
import { ILogin } from '../types'
import { api } from '@/axios'

export const loginApi = async (data: ILogin) => {
    try {
        const response = await api.post('/api/auth/login', data)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            throw new CustomError(response)
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error?.response) {
            throw new CustomError(error.response)
        } else {
            throw error
        }
    }
}
