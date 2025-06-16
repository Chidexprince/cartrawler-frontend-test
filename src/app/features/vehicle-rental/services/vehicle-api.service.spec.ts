import { TestBed } from "@angular/core/testing";

import { VehicleApiService } from "./vehicle-api.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { VehicleMapperService } from "./vehicle-mapper.service";
import { VehicleVendorAvail } from "../models/vehicle.model";
import { ApiVehAvailRSCore } from "../models/api.interface";
import { provideHttpClient } from "@angular/common/http";

describe("VehicleApiService", () => {
  let service: VehicleApiService;
  let httpMock: HttpTestingController;
  let mapperService: jasmine.SpyObj<VehicleMapperService>;

  const mockApiResponse: { VehAvailRSCore: ApiVehAvailRSCore }[] = [
    {
      VehAvailRSCore: {
        VehRentalCore: {
          "@PickUpDateTime": "2020-03-22T10:00:00Z",
          "@ReturnDateTime": "2020-04-06T10:00:00Z",
          PickUpLocation: {
            "@Name": "Las Vegas - Airport",
          },
          ReturnLocation: {
            "@Name": "Las Vegas - Airport",
          },
        },
        VehVendorAvails: [
          {
            Vendor: {
              "@Code": "125",
              "@Name": "ALAMO",
            },
            VehAvails: [
              {
                "@Status": "Available",
                Vehicle: {
                  "@AirConditionInd": "true",
                  "@TransmissionType": "Automatic",
                  "@FuelType": "Petrol",
                  "@DriveType": "Unspecified",
                  "@PassengerQuantity": "5+",
                  "@BaggageQuantity": 3,
                  "@Code": "IFAR",
                  "@CodeContext": "CARTRAWLER",
                  "@DoorCount": 5,
                  VehMakeModel: {
                    "@Name": "Toyota Rav4 or similar",
                  },
                  PictureURL:
                    "https://ctimg-fleet.cartrawler.com/toyota/rav4/primary.png?auto=format&w=600",
                },
                TotalCharge: {
                  "@RateTotalAmount": 878.98,
                  "@EstimatedTotalAmount": 878.98,
                  "@CurrencyCode": "CAD",
                },
              },
            ],
          },
        ],
      },
    },
  ];

  const mappedResult: VehicleVendorAvail[] = [
    {
      vendor: { code: "125", name: "ALAMO" },
      vehicles: [
        {
          status: "Available",
          airConditionInd: true,
          transmissionType: "Automatic",
          fuelType: "Petrol",
          driveType: "Unspecified",
          passengerQuantity: "5+",
          baggageQuantity: 3,
          code: "IFAR",
          doorCount: 5,
          makeModel: "Toyota Rav4 or similar",
          pictureUrl:
            "https://ctimg-fleet.cartrawler.com/toyota/rav4/primary.png?auto=format&w=600",
          totalCharge: {
            rateTotalAmount: 878.98,
            estimatedTotalAmount: 878.98,
            currencyCode: "CAD",
          },
        },
      ],
      rentalCore: {
        pickUpDateTime: new Date("2020-03-22T10:00:00.000Z"),
        returnDateTime: new Date("2020-04-06T10:00:00.000Z"),
        pickUpLocation: "Las Vegas - Airport",
        returnLocation: "Las Vegas - Airport",
      },
    },
  ];

  beforeEach(() => {
    const mapperSpy = jasmine.createSpyObj("VehicleMapperService", ["mapApiResponse"]);
    TestBed.configureTestingModule({
      providers: [
        VehicleApiService,
        { provide: VehicleMapperService, useValue: mapperSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(VehicleApiService);
    httpMock = TestBed.inject(HttpTestingController);
    mapperService = TestBed.inject(VehicleMapperService) as jasmine.SpyObj<VehicleMapperService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch and map available vehicles", () => {
    mapperService.mapApiResponse.and.returnValue(mappedResult);

    service.getAvailableVehicles().subscribe((result) => {
      expect(result).toEqual(mappedResult);
      expect(mapperService.mapApiResponse).toHaveBeenCalledWith(mockApiResponse[0].VehAvailRSCore);
    });

    const req = httpMock.expectOne("https://ajaxgeo.cartrawler.com/ctabe/cars.json");
    expect(req.request.method).toBe("GET");
    req.flush(mockApiResponse);
  });
});
