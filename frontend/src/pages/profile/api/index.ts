import axios from 'axios'
import { CustomError } from '@/axios/customError'
import { api } from '@/axios'

export const updateNameApi = async (name: string, userId: string, token: string) => {
    try {
        const response = await api.put(`api/auth/${userId}`, {name}, {
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

export const updateEmailApi = async (email: string, userId: string, token: string) => {
    try {
        const response = await api.put(`api/auth/${userId}`, {email}, {
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

export const updatePhoneNumberApi = async (phoneNumber: string, userId: string, token: string) => {
    try {
        const response = await api.put(`api/auth/${userId}`, {
            phone_number: phoneNumber
        }, {
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
