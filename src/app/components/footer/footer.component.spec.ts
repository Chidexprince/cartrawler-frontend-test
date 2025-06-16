import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";
import { By } from "@angular/platform-browser";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the current year", () => {
    const year = new Date().getFullYear();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(`${year} CarTrawler`);
  });

  it("should contain privacy, terms, and contact links", () => {
    const links = fixture.debugElement.queryAll(By.css("li"));
    const linkTexts = links.map((el) => el.nativeElement.textContent.trim());

    expect(linkTexts).toContain("Privacy Policy");
    expect(linkTexts).toContain("Terms of Service");
    expect(linkTexts).toContain("Contact Us");
  });
});
