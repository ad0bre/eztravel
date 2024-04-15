export interface GetUserProfile {
    id: string,
    name: string,
    email: string,
    phone: string,
    userId: string | null,
    isVerified: boolean,
    type: number
}