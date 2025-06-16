import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent } from "../../shared/ui/buttons/button";

@Component({
  selector: "app-not-found",
  imports: [ButtonComponent],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(["/"]);
  }
}
