import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XviewTemplateComponent } from './xview-template.component';

describe('XviewTemplateComponent', () => {
  let component: XviewTemplateComponent;
  let fixture: ComponentFixture<XviewTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XviewTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XviewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
