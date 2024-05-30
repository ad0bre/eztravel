import { DateOnly } from "./date-only";
import { GetAccomodation } from "./get-accomodation";
import { GetActivity } from "./get-activity";
import { GetTransport } from "./get-transport";

export interface GetTrip {
    id: string,
    destination: string,
    arrivalDay: DateOnly,
    departureDay: DateOnly,
    numberOfPeople: number,
    budget: number,
    transports: GetTransport[],
    accomodations: GetAccomodation[],
    activities: GetActivity[],
    budgetNotEnough: boolean,
    userId: string
}
