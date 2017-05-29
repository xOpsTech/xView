import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInsightsComponent } from './business-insights.component';

describe('BusinessInsightsComponent', () => {
  let component: BusinessInsightsComponent;
  let fixture: ComponentFixture<BusinessInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
