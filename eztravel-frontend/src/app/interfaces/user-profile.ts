export interface UserProfile {
    name: string,
    email: string,
    phone: string,
    userId: string | null,
    isVerified: boolean,
    type: number
}
