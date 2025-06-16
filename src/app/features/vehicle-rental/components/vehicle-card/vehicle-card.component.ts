import { Component, Input } from "@angular/core";
import { Vehicle } from "../../models/vehicle.model";
import { CommonModule } from "@angular/common";
import { VehicleApiService } from "../../services/vehicle-api.service";
import { Router } from "@angular/router";
import { ButtonComponent } from "../../../../shared/ui/buttons/button";

@Component({
  selector: "app-vehicle-card",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./vehicle-card.component.html",
  styleUrl: "./vehicle-card.component.scss",
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;

  constructor(
    private vehicleApiService: VehicleApiService,
    private router: Router
  ) {}

  viewVehicleDetails() {
    this.vehicleApiService.setSelectedVehicle(this.vehicle);
    this.router.navigate(["/vehicle-details"]);
  }
}
