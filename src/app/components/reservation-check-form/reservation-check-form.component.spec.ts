import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCheckFormComponent } from './reservation-check-form.component';

describe('ReservationCheckFormComponent', () => {
  let component: ReservationCheckFormComponent;
  let fixture: ComponentFixture<ReservationCheckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCheckFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCheckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
