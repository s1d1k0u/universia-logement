import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceSummaryComponent } from './choice-summary.component';

describe('ChoiceSummaryComponent', () => {
  let component: ChoiceSummaryComponent;
  let fixture: ComponentFixture<ChoiceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
