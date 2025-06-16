import { Vehicle, VehicleRentalCore, VehicleVendorAvail } from "../models/vehicle.model";

export const mockRentalInfo: VehicleRentalCore = {
  pickUpLocation: "Lisbon Airport",
  returnLocation: "Porto Downtown",
  pickUpDateTime: new Date("2025-06-20T10:00:00Z"),
  returnDateTime: new Date("2025-06-25T18:00:00Z"),
};

export const mockVehicles: Vehicle[] = [
  {
    code: "A1",
    makeModel: "Car A",
    pictureUrl: "",
    passengerQuantity: "4",
    baggageQuantity: 2,
    transmissionType: "Auto",
    fuelType: "Petrol",
    driveType: "FWD",
    doorCount: 4,
    airConditionInd: true,
    status: "Available",
    totalCharge: {
      rateTotalAmount: 50,
      estimatedTotalAmount: 55,
      currencyCode: "CAD",
    },
  },
  {
    code: "B1",
    makeModel: "Car B",
    pictureUrl: "",
    passengerQuantity: "4",
    baggageQuantity: 3,
    transmissionType: "Manual",
    fuelType: "Diesel",
    driveType: "RWD",
    doorCount: 4,
    airConditionInd: false,
    status: "Available",
    totalCharge: {
      rateTotalAmount: 70,
      estimatedTotalAmount: 75,
      currencyCode: "CAD",
    },
  },
  {
    code: "C1",
    makeModel: "Car C",
    pictureUrl: "",
    passengerQuantity: "4",
    baggageQuantity: 1,
    transmissionType: "Auto",
    fuelType: "Electric",
    driveType: "AWD",
    doorCount: 4,
    airConditionInd: true,
    status: "Available",
    totalCharge: {
      rateTotalAmount: 60,
      estimatedTotalAmount: 65,
      currencyCode: "CAD",
    },
  },
];

export const mockVendorData: VehicleVendorAvail[] = [
  {
    vendor: {
      code: "123",
      name: "TestVendor",
    },
    rentalCore: {
      pickUpLocation: "Lisbon Airport",
      returnLocation: "Porto",
      pickUpDateTime: new Date("2025-06-20T10:00:00Z"),
      returnDateTime: new Date("2025-06-25T18:00:00Z"),
    },
    vehicles: [
      {
        status: "Available",
        airConditionInd: true,
        transmissionType: "Automatic",
        fuelType: "Petrol",
        driveType: "FWD",
        passengerQuantity: "5",
        baggageQuantity: 2,
        code: "ABC123",
        doorCount: 4,
        size: "Compact",
        makeModel: "Toyota Yaris",
        pictureUrl: "test.png",
        totalCharge: {
          rateTotalAmount: 100,
          estimatedTotalAmount: 100,
          currencyCode: "CAD",
        },
      },
    ],
  },
];

export const mockVehicle1 = mockVehicles[0];
