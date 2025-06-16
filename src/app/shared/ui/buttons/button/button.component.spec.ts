import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonComponent } from "./button.component";
import { By } from "@angular/platform-browser";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Input Properties", () => {
    it("should have default variant as primary", () => {
      expect(component.variant).toBe("primary");
    });

    it("should have default disabled as false", () => {
      expect(component.disabled).toBeFalse();
    });

    it("should have default type as button", () => {
      expect(component.type).toBe("button");
    });

    it("should accept variant input", () => {
      component.variant = "secondary";
      fixture.detectChanges();
      expect(component.variant).toBe("secondary");
    });
  });

  describe("Disabled State", () => {
    it("should be disabled when disabled input is true", () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(component.isDisabled).toBeTrue();
    });
  });

  describe("Click Handling", () => {
    it("should emit clicked event when clicked and not disabled", () => {
      spyOn(component.clicked, "emit");
      const button = fixture.debugElement.query(By.css("button"));
      button.nativeElement.click();
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it("should not emit clicked event when disabled", () => {
      component.disabled = true;
      fixture.detectChanges();
      spyOn(component.clicked, "emit");
      const button = fixture.debugElement.query(By.css("button"));
      button.nativeElement.click();
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe("Content Projection", () => {
    it("should project content inside the button", () => {
      const testContent = "Test Button";
      fixture = TestBed.createComponent(ButtonComponent);
      component = fixture.componentInstance;
      const buttonElement = fixture.debugElement.query(By.css("button"));
      buttonElement.nativeElement.textContent = testContent;
      fixture.detectChanges();
      expect(buttonElement.nativeElement.textContent).toContain(testContent);
    });
  });
});
