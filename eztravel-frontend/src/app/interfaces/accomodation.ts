export interface Accomodation {
    name: string,
    description: string,
    location: string,
    checkIn: Date,
    checkOut: Date,
    people: number,
    priority: number,
    profileId: string | null,
    price: number
}