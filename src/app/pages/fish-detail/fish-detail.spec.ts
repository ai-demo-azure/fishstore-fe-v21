import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishDetail } from './fish-detail';

describe('FishDetail', () => {
  let component: FishDetail;
  let fixture: ComponentFixture<FishDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FishDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
