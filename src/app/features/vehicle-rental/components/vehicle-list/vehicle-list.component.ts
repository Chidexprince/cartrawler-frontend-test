import { Component, OnInit } from "@angular/core";
import { Vehicle, VehicleVendorAvail } from "../../models/vehicle.model";
import { VehicleApiService } from "../../services/vehicle-api.service";
import { SortOption } from "../../models/sort-option.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SortVehiclesPipe } from "../../pipes/sort-vehicles.pipe";
import { VehicleCardComponent } from "../vehicle-card/vehicle-card.component";
import { RentalInformationComponent } from "../rental-information/rental-information.component";

@Component({
  standalone: true,
  selector: "app-vehicle-list",
  imports: [
    CommonModule,
    FormsModule,
    SortVehiclesPipe,
    VehicleCardComponent,
    RentalInformationComponent,
  ],
  templateUrl: "./vehicle-list.component.html",
  styleUrl: "./vehicle-list.component.scss",
})
export class VehicleListComponent implements OnInit {
  vendorAvails: VehicleVendorAvail[] = [];
  isLoading = true;
  error: string | null = null;
  sortOptions: SortOption[] = [
    { value: "price-asc", label: "Price (Low to High)" },
    { value: "price-desc", label: "Price (High to Low)" },
    { value: "baggage-asc", label: "Baggage (Low to High)" },
    { value: "baggage-desc", label: "Baggage (High to Low)" },
  ];
  selectedSort = "price-asc";

  constructor(private vehicleService: VehicleApiService) {}

  ngOnInit() {
    this.getAvailableVehicles();
  }

  getAvailableVehicles() {
    this.vehicleService.getAvailableVehicles().subscribe({
      next: (data) => {
        this.vendorAvails = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load vehicle data";
        this.isLoading = false;
      },
    });
  }

  get hasVehicles(): boolean {
    return this.vendorAvails.some((vendor) => vendor.vehicles?.length > 0);
  }
}
