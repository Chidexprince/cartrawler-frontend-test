import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RentalInformationComponent } from "./rental-information.component";
import { By } from "@angular/platform-browser";
import { mockRentalInfo } from "../../mocks/vehicle.mock";

describe("RentalInformationComponent", () => {
  let component: RentalInformationComponent;
  let fixture: ComponentFixture<RentalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not display section if vehicleRentalInfo is null", () => {
    component.vehicleRentalInfo = null;
    fixture.detectChanges();

    const section = fixture.debugElement.query(By.css("section"));
    expect(section).toBeNull();
  });

  it("should display pick-up and return info when vehicleRentalInfo is provided", () => {
    component.vehicleRentalInfo = mockRentalInfo;
    fixture.detectChanges();

    const legendItems = fixture.debugElement.queryAll(By.css(".legend-item"));
    expect(legendItems.length).toBe(2);

    const pickUpText = fixture.debugElement.query(By.css(".legend-item:first-child .legend-detail"))
      .nativeElement.textContent;
    expect(pickUpText).toContain("Lisbon Airport");

    const returnText = fixture.debugElement.query(By.css(".legend-item:last-child .legend-detail"))
      .nativeElement.textContent;
    expect(returnText).toContain("Porto Downtown");
  });
});
