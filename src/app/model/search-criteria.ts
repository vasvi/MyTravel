export interface GlobalDestinationsObject {
    location: string;
    latitude: number;
    longitude: number;
}

export interface CalculatedExpenditure {
    hotelExpenditure: number;
    foodExpenditure: number;
    travelExpenditure: number;
}

export interface Hotel {
    starrating: number;
}

export interface TravelDetails {
    travelmode: string;
    enginetype?: string;
    cartype?: string;
    bustype?: string;
    trainclass?: string;
}

export interface UserParameters {
    budget: number;
    person: number;
    duration: number;
    hotel: Hotel;
    travel: TravelDetails;

}