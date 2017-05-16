import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsMapComponent } from './alerts-map.component';

describe('AlertsMapComponent', () => {
  let component: AlertsMapComponent;
  let fixture: ComponentFixture<AlertsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
