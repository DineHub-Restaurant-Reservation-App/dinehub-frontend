import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMenuDialogComponent } from './manage-menu-dialog.component';

describe('ManageMenuDialogComponent', () => {
  let component: ManageMenuDialogComponent;
  let fixture: ComponentFixture<ManageMenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageMenuDialogComponent]
    });
    fixture = TestBed.createComponent(ManageMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
