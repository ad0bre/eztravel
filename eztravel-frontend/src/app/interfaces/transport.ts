export interface Transport {
    name: string,
    description: string,
    departureLocation: string,
    arrivalLocation: string,
    departureTime: Date,
    arrivalTime: Date,
    price: number,
    type: string,
    capacity: number,
    profileId: string | null,
    priority: number,
}
