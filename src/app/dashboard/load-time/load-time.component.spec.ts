import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTimeComponent } from './load-time.component';

describe('LoadTimeComponent', () => {
  let component: LoadTimeComponent;
  let fixture: ComponentFixture<LoadTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
