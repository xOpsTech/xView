import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertingtoolsComponent } from './alertingtools.component';

describe('AlertsourcesComponent', () => {
  let component: AlertingtoolsComponent;
  let fixture: ComponentFixture<AlertingtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertingtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertingtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
