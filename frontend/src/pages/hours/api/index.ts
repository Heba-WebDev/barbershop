import axios from 'axios'
import { CustomError } from '@/axios/customError'
import { api } from '@/axios'
import { IActivateDay, IChangeHours } from '../types'



export const fetchScheduleApi = async(companyId: string, token: string) => {
    try {
        const response = await api.get(`/api/schedule/${companyId}`, {
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

export const fetchCompanyApi = async(token: string) => {
    try {
        const response = await api.get('/api/company', {
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

export const activateDayApi = async(data: IActivateDay, id: number, token: string) => {
    try {
        const response = await api.patch(`/api/schedule/${id}`, data, {
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

export const changeHoursApi = async(data: IChangeHours, id: number, token: string) => {
    try {
        const response = await api.patch(`/api/schedule/${id}`, data, {
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
