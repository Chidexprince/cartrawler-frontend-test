import { Routes } from "@angular/router";
import { VehicleApiService } from "./features/vehicle-rental/services/vehicle-api.service";
import { VehicleMapperService } from "./features/vehicle-rental/services/vehicle-mapper.service";
import { NotFoundComponent } from "./components/not-found/not-found.component";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./features/vehicle-rental/vehicle-rental.routes").then((m) => m.VEHICLE_ROUTES),
    providers: [
      VehicleApiService, // Available to ALL vehicle routes
      VehicleMapperService, // and their child components
    ],
  },
  {
    path: "vehicles",
    loadChildren: () =>
      import("./features/vehicle-rental/vehicle-rental.routes").then((m) => m.VEHICLE_ROUTES),
    providers: [
      VehicleApiService, // Available to ALL vehicle routes
      VehicleMapperService, // and their child components
    ],
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404", pathMatch: "full" }, // Redirect to Not Found for any unmatched routes
];
