export interface ApiVehAvailRSCore {
  VehRentalCore: {
    "@PickUpDateTime": string;
    "@ReturnDateTime": string;
    PickUpLocation: { "@Name": string };
    ReturnLocation: { "@Name": string };
  };
  VehVendorAvails: ApiVehVendorAvail[];
}

export interface ApiVehVendorAvail {
  Vendor: {
    "@Code": string;
    "@Name": string;
  };
  VehAvails: ApiVehAvail[];
}

export interface ApiVehAvail {
  "@Status": string;
  Vehicle: ApiVehicle;
  TotalCharge: ApiTotalCharge;
}

export interface ApiVehicle {
  "@AirConditionInd": string;
  "@TransmissionType": string;
  "@FuelType": string;
  "@DriveType": string;
  "@PassengerQuantity": string;
  "@BaggageQuantity": number;
  "@Code": string;
  "@CodeContext": string;
  "@DoorCount": number;
  "@Size"?: string;
  VehMakeModel: { "@Name": string };
  PictureURL: string;
}

export interface ApiTotalCharge {
  "@RateTotalAmount": number;
  "@EstimatedTotalAmount": number;
  "@CurrencyCode": string;
}
