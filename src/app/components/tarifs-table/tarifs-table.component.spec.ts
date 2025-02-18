import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsTableComponent } from './tarifs-table.component';

describe('TarifsTableComponent', () => {
  let component: TarifsTableComponent;
  let fixture: ComponentFixture<TarifsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
