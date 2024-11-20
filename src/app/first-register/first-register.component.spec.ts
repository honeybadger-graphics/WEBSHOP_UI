import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRegisterComponent } from './first-register.component';

describe('FirstRegisterComponent', () => {
  let component: FirstRegisterComponent;
  let fixture: ComponentFixture<FirstRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
