import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KibanaAdminComponent } from './kibana-admin.component';

describe('KibanaAdminComponent', () => {
  let component: KibanaAdminComponent;
  let fixture: ComponentFixture<KibanaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KibanaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KibanaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
