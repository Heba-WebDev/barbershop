import { api } from '@/axios'
import axios from 'axios'
import { CustomError } from '@/axios/customError'

export const confirmEmailApi = async (token: string) => {
    try {
        const response = await api.patch('/api/auth/confirm-email', {
            token
        })
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