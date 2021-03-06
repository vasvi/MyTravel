export const travelMode = {
  'twowheeler': 'Two Wheeler',
  'fourwheeler': 'Four Wheeler',
  'bus': 'bus',
  'train': 'train',
  'flight': 'flight'
};

export const hotelRatingType = {
  'twostar': '2 star',
  'threestar': '3 star',
  'fourstar': '4 star',
  'fivestar': '5 star'
};

export const busType = {
  'ac': 'AC',
  'volvo': 'Volvo',
  'nonac': 'NonAC'
};

export const engineType = {
  'diesel': 'Diesel',
  'petrol': 'Petrol'
};

export const trainType = {
  'firstclass': 'First Class',
  'secondclass': 'Second Class',
  'thirdclass': 'Third Class',
  'fourthclass': 'Fourth Class'
};

export const carType = {
  'hatchback': 'HatchBack (4 Seats)',
  'sedan': 'Sedan (5 Seats)',
  'suv': 'SUV/MUV (7 Seats)'
};


export const searchConstants = {

  /**
   * Hotel and food cost based on star rating
   */
  hotelAndFoodPrices: {
    '2 star': {
      hotelPrice: 1000,
      foodPrice: 500
    },
    '3 star': {
      hotelPrice: 2000,
      foodPrice: 700
    },
    '4 star': {
      hotelPrice: 4000,
      foodPrice: 1000
    },
    '5 star': {
      hotelPrice: 6000,
      foodPrice: 2000
    }
  },

  /**
   * Travel Constants
   */
  modeOfTravelPrices: {
    twoWheeler: {
      seatingCapacity: 2,
      petrol: 2
    },
    driving: {
      engineType: {
        petrol: 5,
        diesel: 3
      },
      seatingCapacity: {
        'SUV/MUV (7 Seats)': 7,
        'HatchBack (4 Seats)': 4,
        'Sedan (5 Seats)': 5
      }
    },
    bus: {
      volvo: 2,
      ac: 1.5,
      nonAc: 1
    },
    train: {
      1: 4,
      2: 2,
      3: 1.3,
      4: 0.8
    }
  },
  defaultLocation: {
    latitude: 0,
    longitude: 0
  }

};
