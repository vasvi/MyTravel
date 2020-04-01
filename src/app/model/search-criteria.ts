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
    hotelExpenditure:number;
    foodExpenditure: number;
    travelExpenditure: number;
}

export interface UserParameters {
    hotel: {
        numberOfNights: number;
        starRating: number;
      };
      travel: {
        modeOfTravel: string;
        driving?: {
          typeOfEngine?: string;
          typeOfVehicle?: string;
        };
        bus?:{
            busClass?: string;
        };
        train?: {
            trainClass?: string;
        };
      };
      budgetPerPerson:number;
      numberOfTravelers: number;
}