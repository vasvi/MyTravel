export class SearchCriteria {
    person: number;
    budget: number;
    duration: number;
    travelmode: string;
    hoteltype: string;
}

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
        busClass?: string;
    };
    train?: {
        trainClass?: string;
    };
}

export interface UserParameters {
    budgetPerPerson: number;
    numberOfTravelers: number;
    durationOfTravel: number;
    hotel: Hotel;
    travel: TravelDetails;

}