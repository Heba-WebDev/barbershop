/* eslint-disable indent */
import axios from 'axios'
import { CustomError } from '@/axios/customError'
import { api } from '@/axios'
import { IAddService } from '../types'

export const createServiceApi = async (data: IAddService, token: string) => {
    try {
        const response = await api.post('/api/service', data, {
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

export const fetchServicsApi = async (token: string) => {
    try {
        const response = await api.get('/api/service', {
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

export const desactivateServiceApi = async(serviceId:string, token:string) => {
    try {
        const response = await api.patch(`/api/service/update-active-service/${serviceId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
export const deletedServiceApi = async (
  serviceId: string,
  token: string
) => {
  try {
    const response = await api.patch(
      `/api/service/remove-service/${serviceId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
