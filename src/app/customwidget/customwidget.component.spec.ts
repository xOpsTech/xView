import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomwidgetComponent } from './customwidget.component';

describe('CustomwidgetComponent', () => {
  let component: CustomwidgetComponent;
  let fixture: ComponentFixture<CustomwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
