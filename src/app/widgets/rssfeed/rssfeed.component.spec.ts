import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssfeedComponent } from './rssfeed.component';

describe('RssfeedComponent', () => {
  let component: RssfeedComponent;
  let fixture: ComponentFixture<RssfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
