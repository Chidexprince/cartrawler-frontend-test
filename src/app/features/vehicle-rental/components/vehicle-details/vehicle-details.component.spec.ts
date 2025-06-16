import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VehicleDetailsComponent } from "./vehicle-details.component";
import { CommonModule } from "@angular/common";
import { VehicleApiService } from "../../services/vehicle-api.service";
import { mockVehicle1 } from "../../mocks/vehicle.mock";

describe("VehicleDetailsComponent", () => {
  let component: VehicleDetailsComponent;
  let fixture: ComponentFixture<VehicleDetailsComponent>;

  let mockVehicleService: jasmine.SpyObj<VehicleApiService>;

  beforeEach(async () => {
    mockVehicleService = jasmine.createSpyObj("VehicleApiService", [
      "getSelectedVehicle",
      "clearSelectedVehicle",
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, VehicleDetailsComponent],
      providers: [{ provide: VehicleApiService, useValue: mockVehicleService }],
    }).compileComponents();
  });

  describe("with vehicle selected", () => {
    beforeEach(() => {
      mockVehicleService.getSelectedVehicle.and.returnValue(mockVehicle1);
      fixture = TestBed.createComponent(VehicleDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create the component", () => {
      expect(component).toBeTruthy();
    });

    it("should initialize with a selected vehicle", () => {
      expect(component.vehicle).toEqual(mockVehicle1);
    });

    it("should display the vehicle make and model", () => {
      const titleEl: HTMLElement = fixture.nativeElement.querySelector("h1");
      expect(titleEl.textContent).toContain("Car A");
    });

    it("should call clearSelectedVehicle on destroy", () => {
      fixture.destroy();
      expect(mockVehicleService.clearSelectedVehicle).toHaveBeenCalled();
    });
  });

  describe("with no vehicle selected", () => {
    beforeEach(() => {
      mockVehicleService.getSelectedVehicle.and.returnValue(null);
      fixture = TestBed.createComponent(VehicleDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should show no vehicle message", () => {
      const messageEl: HTMLElement = fixture.nativeElement.querySelector(".no-vehicle-message");
      expect(messageEl.textContent).toContain("No vehicle selected");
    });

    it("hasVehicle should return false", () => {
      expect(component.hasVehicle).toBeFalse();
    });
  });
});
