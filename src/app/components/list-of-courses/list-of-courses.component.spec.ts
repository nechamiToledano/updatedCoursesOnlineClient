import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCoursesComponent } from './list-of-courses.component';

describe('ListOfCoursesComponent', () => {
  let component: ListOfCoursesComponent;
  let fixture: ComponentFixture<ListOfCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
