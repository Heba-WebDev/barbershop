import { Injectable } from '@nestjs/common'
import { v2, type UploadApiErrorResponse, type UploadApiResponse } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  async uploadImageFile (
    file: Express.Multer.File,
    folder: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await new Promise((resolve, reject) => {
      v2.uploader.upload_stream(
        {
          resource_type: 'image',
          folder
        },
        (error, result) => {
          if (error) { reject(error); return }
          resolve(result)
        }
      ).end(file.buffer)
    })
  }

  async deleteFile (id: string, prefix?: string) {
    await v2.api.delete_resources([`${prefix}/${id}`])
  }
}
