export const searchConstants = {

  /**
   * Hotel and food cost based on star rating
   */
  hotelAndFoodPrices: {
    2: {
      hotelPrice: 1000,
      foodPrice: 500
    },
    3: {
      hotelPrice: 2000,
      foodPrice: 700
    },
    4: {
      hotelPrice: 4000,
      foodPrice: 1000
    },
    5: {
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
        suv: 7,
        hatchback: 4,
        sedan: 5
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
