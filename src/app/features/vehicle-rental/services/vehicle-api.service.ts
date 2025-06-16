import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { VehicleMapperService } from "./vehicle-mapper.service";
import { Vehicle, VehicleVendorAvail } from "../models/vehicle.model";
import { ApiVehAvailRSCore } from "../models/api.interface";

@Injectable()
export class VehicleApiService {
  private apiUrl = "https://ajaxgeo.cartrawler.com/ctabe/cars.json";
  private selectedVehicleSource = new BehaviorSubject<Vehicle | null>(null);

  // Public observable for components to subscribe to
  currentVehicle$ = this.selectedVehicleSource.asObservable();

  constructor(
    private http: HttpClient,
    private mapper: VehicleMapperService
  ) {}

  getAvailableVehicles(): Observable<VehicleVendorAvail[]> {
    return this.http
      .get<{ VehAvailRSCore: ApiVehAvailRSCore }[]>(this.apiUrl)
      .pipe(map((response) => this.mapper.mapApiResponse(response[0].VehAvailRSCore)));
  }

  // Set the currently selected vehicle
  setSelectedVehicle(vehicle: Vehicle): void {
    this.selectedVehicleSource.next(vehicle);
    // Persist to sessionStorage for page refresh support
    sessionStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
  }

  // Get the selected vehicle (useful when arriving directly at details page)
  getSelectedVehicle(): Vehicle | null {
    // Check sessionStorage first
    const storedVehicle = sessionStorage.getItem("selectedVehicle");
    if (storedVehicle) {
      return JSON.parse(storedVehicle);
    }
    return this.selectedVehicleSource.value;
  }

  // Clear selection
  clearSelectedVehicle(): void {
    this.selectedVehicleSource.next(null);
    sessionStorage.removeItem("selectedVehicle");
  }
}
