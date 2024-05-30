export interface Activity {
    name: string,
    description: string,
    type: string,
    address: string,
    priority: number,
    profileId: string | null,
    price: number
}
