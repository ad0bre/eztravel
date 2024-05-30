export interface Tripform {
  destination: string,
  currentLocation: string,
  arrivalDate: Date,
  departureDate: Date,
  numberOfPeople: number,
  budget: number,
  userId: string | null
}
