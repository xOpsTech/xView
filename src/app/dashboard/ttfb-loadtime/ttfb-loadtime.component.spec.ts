import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtfbLoadtimeComponent } from './ttfb-loadtime.component';

describe('TtfbLoadtimeComponent', () => {
  let component: TtfbLoadtimeComponent;
  let fixture: ComponentFixture<TtfbLoadtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtfbLoadtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtfbLoadtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
