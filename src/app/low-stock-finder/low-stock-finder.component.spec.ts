import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockFinderComponent } from './low-stock-finder.component';

describe('LowStockFinderComponent', () => {
  let component: LowStockFinderComponent;
  let fixture: ComponentFixture<LowStockFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowStockFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
