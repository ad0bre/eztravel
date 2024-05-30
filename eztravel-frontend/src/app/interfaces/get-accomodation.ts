export interface GetAccomodation {
    id: string,
    name: string,
    description: string,
    location: string,
    checkIn: Date,
    checkOut: Date,
    people: number,
    profileId: string | null,
    price: number
}
