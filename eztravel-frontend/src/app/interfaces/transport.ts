export interface Transport {
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
    userId: string
}
