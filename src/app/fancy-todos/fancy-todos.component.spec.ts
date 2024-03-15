import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyTodosComponent } from './fancy-todos.component';

describe('FancyTodosComponent', () => {
  let component: FancyTodosComponent;
  let fixture: ComponentFixture<FancyTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FancyTodosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FancyTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
