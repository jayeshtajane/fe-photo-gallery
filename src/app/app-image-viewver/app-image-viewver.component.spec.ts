import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppImageViewverComponent } from './app-image-viewver.component';

describe('AppImageViewverComponent', () => {
  let component: AppImageViewverComponent;
  let fixture: ComponentFixture<AppImageViewverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppImageViewverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppImageViewverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
