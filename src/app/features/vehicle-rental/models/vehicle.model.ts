export interface VehicleRentalCore {
  pickUpDateTime: Date;
  returnDateTime: Date;
  pickUpLocation: string;
  returnLocation: string;
}

export interface VehicleVendor {
  code: string;
  name: string;
}

export interface Vehicle {
  status: string;
  airConditionInd: boolean;
  transmissionType: string;
  fuelType: string;
  driveType: string;
  passengerQuantity: string;
  baggageQuantity: number;
  code: string;
  doorCount: number;
  size?: string;
  makeModel: string;
  pictureUrl: string;
  totalCharge: {
    rateTotalAmount: number;
    estimatedTotalAmount: number;
    currencyCode: string;
  };
}

export interface VehicleVendorAvail {
  vendor: VehicleVendor;
  vehicles: Vehicle[];
  rentalCore: VehicleRentalCore;
}
