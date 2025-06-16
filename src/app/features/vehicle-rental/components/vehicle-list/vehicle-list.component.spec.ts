import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { VehicleListComponent } from "./vehicle-list.component";
import { VehicleApiService } from "../../services/vehicle-api.service";
import { VehicleVendorAvail } from "../../models/vehicle.model";
import { of, throwError } from "rxjs";
import { mockVendorData } from "../../mocks/vehicle.mock";

describe("VehicleListComponent", () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleApiService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj("VehicleApiService", ["getAvailableVehicles"]);

    TestBed.configureTestingModule({
      imports: [VehicleListComponent],
      providers: [{ provide: VehicleApiService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    vehicleServiceSpy = TestBed.inject(VehicleApiService) as jasmine.SpyObj<VehicleApiService>;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch vehicle data successfully and display it", () => {
    vehicleServiceSpy.getAvailableVehicles.and.returnValue(of(mockVendorData));
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.vendorAvails.length).toBe(1);
    expect(
      fixture.nativeElement.querySelector(".vehicle-list-header-title")?.textContent
    ).toContain("Available Vehicles");
    expect(fixture.nativeElement.querySelectorAll("app-vehicle-card").length).toBe(1);
  });

  it("should show error message when service fails", () => {
    vehicleServiceSpy.getAvailableVehicles.and.returnValue(
      throwError(() => new Error("API Error"))
    );
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector(".error");
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBe("Failed to load vehicle data");
    expect(errorEl?.textContent).toContain("Failed to load vehicle data");
  });

  it("should show empty state when no vehicles are available", () => {
    const emptyData: VehicleVendorAvail[] = [
      { vendor: { code: "1", name: "EmptyVendor" }, rentalCore: null as any, vehicles: [] },
    ];
    vehicleServiceSpy.getAvailableVehicles.and.returnValue(of(emptyData));
    fixture.detectChanges();

    expect(component.hasVehicles).toBeFalse();
    expect(fixture.nativeElement.querySelector(".empty-state")?.textContent).toContain(
      "No vehicles available"
    );
  });
  it("should have correct sort options", () => {
    expect(component.sortOptions.length).toBe(4);
    expect(component.sortOptions[0].value).toBe("price-asc");
    expect(component.sortOptions[1].value).toBe("price-desc");
    expect(component.sortOptions[2].value).toBe("baggage-asc");
    expect(component.sortOptions[3].value).toBe("baggage-desc");
  });
});
