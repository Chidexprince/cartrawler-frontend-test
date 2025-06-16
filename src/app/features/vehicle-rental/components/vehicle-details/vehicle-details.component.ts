import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Vehicle } from "../../models/vehicle.model";
import { VehicleApiService } from "../../services/vehicle-api.service";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../../shared/ui/buttons/button";

@Component({
  selector: "app-vehicle-details",
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./vehicle-details.component.html",
  styleUrl: "./vehicle-details.component.scss",
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicle: Vehicle | null = null;

  constructor(private vehicleApiService: VehicleApiService, private location: Location) {}

  ngOnInit() {
    this.vehicle = this.vehicleApiService.getSelectedVehicle();
  }

  get hasVehicle(): boolean {
    return this.vehicle !== null;
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    // Clean up any subscriptions or resources
    this.vehicleApiService.clearSelectedVehicle();
  }
}
