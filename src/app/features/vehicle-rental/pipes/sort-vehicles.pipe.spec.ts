import { SortVehiclesPipe } from "./sort-vehicles.pipe";

import { Vehicle } from "../models/vehicle.model";

describe("SortVehiclesPipe", () => {
  let pipe: SortVehiclesPipe;

  const mockVehicles: Vehicle[] = [
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
        currencyCode: "USD",
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
        currencyCode: "USD",
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
        currencyCode: "USD",
      },
    },
  ];

  beforeEach(() => {
    pipe = new SortVehiclesPipe();
  });

  it("should sort by price ascending", () => {
    const result = pipe.transform(mockVehicles, "price-asc");
    expect(result[0].totalCharge.rateTotalAmount).toBe(50);
    expect(result[1].totalCharge.rateTotalAmount).toBe(60);
    expect(result[2].totalCharge.rateTotalAmount).toBe(70);
  });

  it("should sort by price descending", () => {
    const result = pipe.transform(mockVehicles, "price-desc");
    expect(result[0].totalCharge.rateTotalAmount).toBe(70);
    expect(result[1].totalCharge.rateTotalAmount).toBe(60);
    expect(result[2].totalCharge.rateTotalAmount).toBe(50);
  });

  it("should sort by baggage ascending", () => {
    const result = pipe.transform(mockVehicles, "baggage-asc");
    expect(result[0].baggageQuantity).toBe(1);
    expect(result[1].baggageQuantity).toBe(2);
    expect(result[2].baggageQuantity).toBe(3);
  });

  it("should sort by baggage descending", () => {
    const result = pipe.transform(mockVehicles, "baggage-desc");
    expect(result[0].baggageQuantity).toBe(3);
    expect(result[1].baggageQuantity).toBe(2);
    expect(result[2].baggageQuantity).toBe(1);
  });

  it("should return original array if sortBy is invalid", () => {
    const result = pipe.transform(mockVehicles, "");
    expect(result).toEqual(mockVehicles);
  });

  it("should return original array if input array is empty", () => {
    const result = pipe.transform([], "price-asc");
    expect(result).toEqual([]);
  });

  it("should return original array if input is null", () => {
    const result = pipe.transform(null as any, "price-asc");
    expect(result).toBeNull();
  });
});
