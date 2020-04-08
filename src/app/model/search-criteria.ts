export interface ApplicableLocationObject {
    location: Object;
    position: Object;
}

export interface GlobalDestinationsObject {
    location: string;
    latitude: number;
    longitude: number;
    imageUrl?: string;
    information?: string;
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

export interface Location {
    formatted_address: string;
    photos: Array<string>;
    id: string;
    name: string;
    place_id: string;
    reference: string;
    geometry: Array<any>; // [lat, long]
}

export interface Place {
    name: string,
    imageUrl: string,
    rating: number,
    types: Array<string>
}

export interface Position {
    coords: Coordinates;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}
