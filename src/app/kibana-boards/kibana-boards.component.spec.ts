import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KibanaBoardsComponent } from './kibana-boards.component';

describe('KibanaBoardsComponent', () => {
  let component: KibanaBoardsComponent;
  let fixture: ComponentFixture<KibanaBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KibanaBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KibanaBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
