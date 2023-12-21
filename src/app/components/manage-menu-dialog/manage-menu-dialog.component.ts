import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-manage-menu-dialog',
  templateUrl: './manage-menu-dialog.component.html',
  styleUrls: ['./manage-menu-dialog.component.scss'],
})
export class ManageMenuDialogComponent implements OnInit {
  isCategoryModal!: boolean;
  isEditModal: boolean = false;
  categories!: string[];
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { modalType: string; modalTitle: string; formData?: any },
    public dialogRef: MatDialogRef<ManageMenuDialogComponent>,

    private fb: FormBuilder,
    private dbs: DashboardService
  ) {}
  ngOnInit(): void {
    this.isCategoryModal =
      this.data.modalType === 'editMenuItem' ||
      this.data.modalType === 'addMenuItem'
        ? false
        : true;

    this.categories = this.dbs.getCategories();

    if (this.data) {
      this.isEditModal = true;
    }

    if (this.isCategoryModal) {
      this.form = this.fb.group({
        name: [this.data.formData?.name ?? '', Validators.required],
        description: [
          this.data.formData?.description ?? '',
          Validators.required,
        ],
      });
    } else {
      this.form = this.fb.group({
        name: [this.data.formData?.name ?? '', Validators.required],
        description: [
          this.data.formData?.description ?? '',
          Validators.required,
        ],
        category: [this.data.formData?.category ?? '', Validators.required],
        price: [this.data.formData?.price ?? '', Validators.required],
        imageUrl: [this.data.formData?.imageURL ?? '', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isCategoryModal && !this.isEditModal) {
        this.dbs.addNewCategory({ ...this.form.value, items: [] });
      } else if (this.isCategoryModal && this.isEditModal) {
        this.dbs.updateCategory(this.form.value);
      } else if (!this.isCategoryModal && this.isEditModal) {
        this.dbs.addNewMenuItem(this.form.value);
      } else {
        this.dbs.updateMenuItem(this.form.value);
      }
      this.dialogRef.close();
    }
  }
}
