import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-menu-dialog',
  templateUrl: './manage-menu-dialog.component.html',
  styleUrls: ['./manage-menu-dialog.component.scss'],
})
export class ManageMenuDialogComponent implements OnInit {
  isCategoryModal: boolean = true;
  isEditModal: boolean = false;
  categories!: string[];
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { modalType: string; modalTitle: string; formData?: any },
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.isCategoryModal =
      this.data.modalType === 'editMenuItem' ||
      this.data.modalType === 'addMenuItem'
        ? false
        : true;
    this.isEditModal =
      this.data.modalType === 'editCategory' ||
      this.data.modalType === 'editMenuItem'
        ? true
        : false;
    this.categories = ['Seafood', 'sides'];

    if (!this.isEditModal) {
      this.form = this.fb.group({
        name: [this.data.formData?.name ?? '', Validators.required],
        description: [
          this.data.formData?.description ?? '',
          Validators.required,
        ],
      });
    } else {
      console.log(this.data.formData);
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
    console.log(this.form.value);
  }
}
