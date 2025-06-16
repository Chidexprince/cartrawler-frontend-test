import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotFoundComponent } from "./not-found.component";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("NotFoundComponent", () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display a 404 heading and message", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h2")?.textContent).toContain("404");
    expect(compiled.querySelector("p")?.textContent).toContain("doesn't exist or has been moved");
  });

  it('should navigate to home when "Return to Home" button is clicked', () => {
    const button = fixture.debugElement.query(By.css("button"));
    button.triggerEventHandler("click");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/"]);
  });
});
