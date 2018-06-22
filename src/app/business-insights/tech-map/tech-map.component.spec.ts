import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechMapComponent } from './tech-map.component';

describe('TechMapComponent', () => {
  let component: TechMapComponent;
  let fixture: ComponentFixture<TechMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
