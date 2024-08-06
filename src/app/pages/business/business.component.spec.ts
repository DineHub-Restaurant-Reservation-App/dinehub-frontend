import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessComponent } from './business.component';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessComponent]
    });
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
