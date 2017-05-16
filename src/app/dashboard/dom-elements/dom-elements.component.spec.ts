import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomElementsComponent } from './dom-elements.component';

describe('DomElementsComponent', () => {
  let component: DomElementsComponent;
  let fixture: ComponentFixture<DomElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
