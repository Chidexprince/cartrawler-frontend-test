import { TestBed } from "@angular/core/testing";
import { VehicleMapperService } from "./vehicle-mapper.service";
import { ApiVehAvailRSCore } from "../models/api.interface";

describe("VehicleMapperService", () => {
  let service: VehicleMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleMapperService],
    });
    service = TestBed.inject(VehicleMapperService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return an empty array when VehVendorAvails is missing", () => {
    const emptyApiData = {} as ApiVehAvailRSCore;
    const result = service.mapApiResponse(emptyApiData);
    expect(result).toEqual([]);
  });

  it("should correctly map API data to VehicleVendorAvail[]", () => {
    const apiData: ApiVehAvailRSCore = {
      VehRentalCore: {
        "@PickUpDateTime": "2024-01-01T10:00:00Z",
        "@ReturnDateTime": "2024-01-05T10:00:00Z",
        PickUpLocation: {
          "@Name": "Lisbon Airport",
        },
        ReturnLocation: {
          "@Name": "Porto Airport",
        },
      },
      VehVendorAvails: [
        {
          Vendor: {
            "@Code": "200",
            "@Name": "EUROPCAR",
          },
          VehAvails: [
            {
              "@Status": "Available",
              Vehicle: {
                "@AirConditionInd": "true",
                "@TransmissionType": "Manual",
                "@FuelType": "Diesel",
                "@DriveType": "FWD",
                "@PassengerQuantity": "5",
                "@BaggageQuantity": 2,
                "@Code": "CDMR",
                "@CodeContext": "CARTRAWLER",
                "@DoorCount": 4,
                "@Size": "Compact",
                VehMakeModel: {
                  "@Name": "Renault Clio or similar",
                },
                PictureURL: "https://example.com/clio.png",
              },
              TotalCharge: {
                "@RateTotalAmount": 200.5,
                "@EstimatedTotalAmount": 220.5,
                "@CurrencyCode": "EUR",
              },
            },
          ],
        },
      ],
    };

    const result = service.mapApiResponse(apiData);

    expect(result.length).toBe(1);
    const mapped = result[0];

    expect(mapped.vendor).toEqual({ code: "200", name: "EUROPCAR" });
    expect(mapped.rentalCore.pickUpLocation).toBe("Lisbon Airport");
    expect(mapped.rentalCore.returnLocation).toBe("Porto Airport");
    expect(mapped.vehicles.length).toBe(1);

    const vehicle = mapped.vehicles[0];
    expect(vehicle.status).toBe("Available");
    expect(vehicle.transmissionType).toBe("Manual");
    expect(vehicle.totalCharge.currencyCode).toBe("EUR");
    expect(vehicle.pictureUrl).toBe("https://example.com/clio.png");
  });
});
