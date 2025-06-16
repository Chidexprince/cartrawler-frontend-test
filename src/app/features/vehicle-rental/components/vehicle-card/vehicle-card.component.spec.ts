import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VehicleCardComponent } from "./vehicle-card.component";
import { Router } from "@angular/router";
import { VehicleApiService } from "../../services/vehicle-api.service";
import { By } from "@angular/platform-browser";
import { mockVehicle1 } from "../../mocks/vehicle.mock";

describe("VehicleCardComponent", () => {
  let component: VehicleCardComponent;
  let fixture: ComponentFixture<VehicleCardComponent>;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const vehicleServiceMock = jasmine.createSpyObj("VehicleApiService", ["setSelectedVehicle"]);
    const routerMock = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [VehicleCardComponent],
      providers: [
        { provide: VehicleApiService, useValue: vehicleServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCardComponent);
    component = fixture.componentInstance;
    component.vehicle = mockVehicle1;

    vehicleServiceSpy = TestBed.inject(VehicleApiService) as jasmine.SpyObj<VehicleApiService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display vehicle make and status", () => {
    const titleEl = fixture.nativeElement.querySelector(".vehicle-title");
    const statusEl = fixture.nativeElement.querySelector(".vehicle-status");

    expect(titleEl.textContent).toContain(mockVehicle1.makeModel);
    expect(statusEl.textContent).toContain(mockVehicle1.status);
  });

  it("should display correct total price with currency", () => {
    const priceEl = fixture.nativeElement.querySelector(".price-amount");
    expect(priceEl.textContent).toContain("CA$50.00");
  });

  it("should render image with correct alt text and src", () => {
    const imgEl = fixture.nativeElement.querySelector("img");
    expect(imgEl.src).toContain(mockVehicle1.pictureUrl);
    expect(imgEl.alt).toContain(`Image of ${mockVehicle1.makeModel}`);
  });

  it("should show correct air conditioning availability", () => {
    const acText = fixture.nativeElement.querySelector(".specs-list").textContent;
    expect(acText).toContain("Yes");
  });

  it("should call service and navigate on View More button click", () => {
    const button = fixture.debugElement.query(By.css(".view-button"));
    button.triggerEventHandler("clicked");

    expect(vehicleServiceSpy.setSelectedVehicle).toHaveBeenCalledWith(mockVehicle1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/vehicle-details"]);
  });
});
