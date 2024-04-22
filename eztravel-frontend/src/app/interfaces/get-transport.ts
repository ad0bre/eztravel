export interface GetTransport {
    id: string,
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
}