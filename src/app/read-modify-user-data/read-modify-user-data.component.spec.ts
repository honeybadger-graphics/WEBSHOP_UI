import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadModifyUserDataComponent } from './read-modify-user-data.component';

describe('ReadModifyUserDataComponent', () => {
  let component: ReadModifyUserDataComponent;
  let fixture: ComponentFixture<ReadModifyUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadModifyUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadModifyUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
