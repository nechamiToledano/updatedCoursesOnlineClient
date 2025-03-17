import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCourseComponent } from './model-course.component';

describe('ModelCourseComponent', () => {
  let component: ModelCourseComponent;
  let fixture: ComponentFixture<ModelCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
