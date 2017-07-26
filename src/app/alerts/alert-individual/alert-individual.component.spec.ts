import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertIndividualComponent } from './alert-individual.component';

describe('AlertIndividualComponent', () => {
  let component: AlertIndividualComponent;
  let fixture: ComponentFixture<AlertIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
