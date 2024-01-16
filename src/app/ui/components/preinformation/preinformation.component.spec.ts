import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinformationComponent } from './preinformation.component';

describe('PreinformationComponent', () => {
  let component: PreinformationComponent;
  let fixture: ComponentFixture<PreinformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreinformationComponent]
    });
    fixture = TestBed.createComponent(PreinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
