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
    starRating: number;
}

export interface TravelDetails {
    modeOfTravel: string;
    driving?: {
        typeOfEngine?: string;
        typeOfVehicle?: string;
    };
    bus?: {
        typeOfBus?: string;
    };
    train?: {
        trainClass?: string;
    };
}

export interface UserParameters {
    budget: number;
    person: number;
    duration: number;
    hotel: Hotel;
    travel: TravelDetails;

}