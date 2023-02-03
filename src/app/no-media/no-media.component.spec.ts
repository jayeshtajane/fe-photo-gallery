import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMediaComponent } from './no-media.component';

describe('NoMediaComponent', () => {
  let component: NoMediaComponent;
  let fixture: ComponentFixture<NoMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
