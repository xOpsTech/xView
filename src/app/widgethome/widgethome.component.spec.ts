import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgethomeComponent } from './widgethome.component';

describe('WidgethomeComponent', () => {
  let component: WidgethomeComponent;
  let fixture: ComponentFixture<WidgethomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgethomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgethomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
