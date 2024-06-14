import axios from 'axios'
import { CustomError } from '@/axios/customError'
import { api } from '@/axios'
import { IRegisterCompany } from '../types'

export const registerCompanyApi = async (data: IRegisterCompany, token: string) => {
    try {
        const response = await api.post('/api/company', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
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
