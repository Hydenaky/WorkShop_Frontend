import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaeesComponent } from './attendaees.component';

describe('AttendaeesComponent', () => {
  let component: AttendaeesComponent;
  let fixture: ComponentFixture<AttendaeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendaeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendaeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
