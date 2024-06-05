export class CustomError extends Error {
    constructor(public response: { data: { message: string } }) {
        super(response.data.message)
        this.isCustomError = true
    }
    isCustomError: boolean
}