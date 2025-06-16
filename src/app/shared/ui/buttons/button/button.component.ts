import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-button",
  imports: [],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  @Input() variant: "primary" | "secondary" | "disabled" = "primary";
  @Input() disabled = false;
  @Input() type: "button" | "submit" | "reset" = "button";
  @Output() clicked = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (!this.isDisabled) {
      this.clicked.emit(event);
    }
  }

  get isDisabled(): boolean {
    return this.disabled || this.variant === "disabled";
  }

  get buttonClasses(): string {
    return `btn ${this.variant}`;
  }
}
