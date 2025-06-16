import { Injectable } from "@angular/core";
import { ApiVehAvail, ApiVehAvailRSCore, ApiVehVendorAvail } from "../models/api.interface";
import {
  VehicleVendorAvail,
  VehicleRentalCore,
  VehicleVendor,
  Vehicle,
} from "../models/vehicle.model";

@Injectable()
export class VehicleMapperService {
  mapApiResponse(apiData: ApiVehAvailRSCore): VehicleVendorAvail[] {
    if (!apiData?.VehVendorAvails) return [];

    const rentalCore = this.mapRentalCore(apiData.VehRentalCore);

    return apiData.VehVendorAvails.map((vendorAvail) => ({
      vendor: this.mapVendor(vendorAvail.Vendor),
      vehicles: vendorAvail.VehAvails.map((vehAvail) => this.mapVehicle(vehAvail)),
      rentalCore,
    }));
  }

  private mapRentalCore(vehRentalCore: ApiVehAvailRSCore["VehRentalCore"]): VehicleRentalCore {
    return {
      pickUpDateTime: new Date(vehRentalCore["@PickUpDateTime"]),
      returnDateTime: new Date(vehRentalCore["@ReturnDateTime"]),
      pickUpLocation: vehRentalCore.PickUpLocation["@Name"],
      returnLocation: vehRentalCore.ReturnLocation["@Name"],
    };
  }

  private mapVendor(vendor: ApiVehVendorAvail["Vendor"]): VehicleVendor {
    return {
      code: vendor["@Code"],
      name: vendor["@Name"],
    };
  }

  private mapVehicle(vehAvail: ApiVehAvail): Vehicle {
    return {
      status: vehAvail["@Status"],
      airConditionInd: vehAvail.Vehicle["@AirConditionInd"] === "true",
      transmissionType: vehAvail.Vehicle["@TransmissionType"],
      fuelType: vehAvail.Vehicle["@FuelType"],
      driveType: vehAvail.Vehicle["@DriveType"],
      passengerQuantity: vehAvail.Vehicle["@PassengerQuantity"],
      baggageQuantity: vehAvail.Vehicle["@BaggageQuantity"],
      code: vehAvail.Vehicle["@Code"],
      doorCount: vehAvail.Vehicle["@DoorCount"],
      size: vehAvail.Vehicle["@Size"],
      makeModel: vehAvail.Vehicle.VehMakeModel["@Name"],
      pictureUrl: vehAvail.Vehicle.PictureURL,
      totalCharge: {
        rateTotalAmount: vehAvail.TotalCharge["@RateTotalAmount"],
        estimatedTotalAmount: vehAvail.TotalCharge["@RateTotalAmount"],
        currencyCode: vehAvail.TotalCharge["@CurrencyCode"],
      },
    };
  }
}
