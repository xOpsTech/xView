import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypemanagementComponent} from './userTypemanagement.component';



describe('UserTypemanagementComponent', () => {
  let component: UserTypemanagementComponent;
  let fixture: ComponentFixture<UserTypemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypemanagementComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

