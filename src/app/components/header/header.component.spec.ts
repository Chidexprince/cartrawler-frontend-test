import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { By } from "@angular/platform-browser";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the app name", () => {
    component.appName = "CarTrawler";
    fixture.detectChanges();
    const logo = fixture.debugElement.query(By.css(".logo h1"));
    expect(logo.nativeElement.textContent).toContain("CarTrawler");
  });

  it("should link to home page", () => {
    const logoLink = fixture.debugElement.query(By.css(".logo"));
    expect(logoLink.attributes["routerLink"]).toBe("/");
  });
});
