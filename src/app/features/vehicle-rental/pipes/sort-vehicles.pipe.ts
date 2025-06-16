import { Pipe, PipeTransform } from "@angular/core";
import { Vehicle } from "../models/vehicle.model";

@Pipe({
  name: "sortVehicles",
})
export class SortVehiclesPipe implements PipeTransform {
  transform(vehicles: Vehicle[], sortBy: string): Vehicle[] {
    if (!vehicles || !sortBy) return vehicles;
    const [property, direction] = sortBy.split("-");

    return [...vehicles].sort((a, b) => {
      let valueA: any, valueB: any;
      if (property === "price") {
        valueA = a.totalCharge.rateTotalAmount;
        valueB = b.totalCharge.rateTotalAmount;
      } else if (property === "baggage") {
        valueA = a.baggageQuantity;
        valueB = b.baggageQuantity;
      }

      return direction === "asc" ? valueA - valueB : valueB - valueA;
    });
  }
}
