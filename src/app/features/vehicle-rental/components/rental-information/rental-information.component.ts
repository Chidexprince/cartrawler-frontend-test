import { Component, Input } from "@angular/core";
import { Vehicle, VehicleRentalCore } from "../../models/vehicle.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-rental-information",
  imports: [CommonModule],
  templateUrl: "./rental-information.component.html",
  styleUrl: "./rental-information.component.scss",
})
export class RentalInformationComponent {
  @Input() vehicleRentalInfo: VehicleRentalCore | null = null;
}
