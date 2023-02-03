import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCategoryComponent } from './explore-category.component';

describe('ExploreCategoryComponent', () => {
  let component: ExploreCategoryComponent;
  let fixture: ComponentFixture<ExploreCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
