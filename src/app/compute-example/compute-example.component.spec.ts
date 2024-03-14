import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeExampleComponent } from './compute-example.component';

describe('ComputeExampleComponent', () => {
  let component: ComputeExampleComponent;
  let fixture: ComponentFixture<ComputeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputeExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
