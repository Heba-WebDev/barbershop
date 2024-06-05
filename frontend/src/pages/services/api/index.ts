import axios from 'axios'
import { CustomError } from '@/axios/customError'
import { IAddService } from '../types'
import { api } from '@/axios'

export const addServiceApi = async (data: IAddService) => {
    try {
        const response = await api.post('/api/service', data)
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
