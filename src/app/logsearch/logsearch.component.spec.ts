import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsearchComponent } from './logsearch.component';

describe('LogsearchComponent', () => {
  let component: LogsearchComponent;
  let fixture: ComponentFixture<LogsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
