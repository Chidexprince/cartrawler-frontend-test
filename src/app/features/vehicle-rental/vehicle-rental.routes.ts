import { Routes } from "@angular/router";

export const VEHICLE_ROUTES: Routes = [
  {
    path: "", // Default route
    loadComponent: () =>
      import("./components/vehicle-list/vehicle-list.component").then(
        (m) => m.VehicleListComponent
      ),
  },
  {
    path: "vehicle-details",
    loadComponent: () =>
      import("./components/vehicle-details/vehicle-details.component").then(
        (m) => m.VehicleDetailsComponent
      ),
  },
];
