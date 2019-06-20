import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyForcastComponent } from './weekly-forcast.component';

describe('WeeklyForcastComponent', () => {
  let component: WeeklyForcastComponent;
  let fixture: ComponentFixture<WeeklyForcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyForcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
