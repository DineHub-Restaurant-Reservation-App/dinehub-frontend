import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/menu.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-manage-menu-dialog',
  templateUrl: './manage-menu-dialog.component.html',
  styleUrls: ['./manage-menu-dialog.component.scss'],
})
export class ManageMenuDialogComponent implements OnInit {
  isCategoryModal!: boolean;
  isEditModal!: boolean;
  categories!: Category[];
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      modalType: string;
      modalTitle: string;
      formData?: any;
      category?:Category;
    },
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

    this.isEditModal =
      this.data.modalType === 'editMenuItem' ||
      this.data.modalType === 'editCategory'
        ? true
        : false;

    this.categories = this.dbs.getCategories();

    if (this.isCategoryModal) {
      this.form = this.fb.group({
        name: [this.data.formData?.name ?? '', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        name: [this.data.formData?.name ?? '', Validators.required],
        description: [
          this.data.formData?.description ?? '',
          Validators.required,
        ],
        category: [
          this.data.formData?.category ?? '',
          !this.isEditModal && Validators.required,
        ],
        price: [this.data.formData?.price ?? '', Validators.required],
        image: [this.data.formData?.image ?? '', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isCategoryModal && !this.isEditModal) {
        this.dbs
          .addNewCategory({ ...this.form.value, items: [] })
          .subscribe((data) => {
            this.dialogRef.close();
          });
      } else if (this.isCategoryModal && this.isEditModal) {
        this.dbs
          .updateCategory(this.form.value, this.data.formData._id)
          .subscribe(
            (data) => {
              this.dialogRef.close();
            },
            (error) => {}
          );
      } else if (!this.isCategoryModal && !this.isEditModal) {
        this.dbs.addNewMenuItem(this.form.value).subscribe((data) => {
          this.dialogRef.close();
        });
      } else {
        this.dbs
          .updateMenuItem(
            this.form.value,
            this.data.formData._id,
            this.data.category?._id
          )
          .subscribe(
            (data) => {
              this.dialogRef.close();
            },
            (error) => {
              console.log('Error while updating menu', error);
            }
          );
      }
    }
  }

  onDelete() {
    if (this.isEditModal && !this.isCategoryModal)
      this.dbs
        .deleteMenuItem(this.data.formData._id, this.data.category?._id)
        .subscribe(
          (data) => {
            this.dialogRef.close();
          },
          (error) => {
            console.log('Error while delete menu', error);
          }
        );
    else if (this.isEditModal && this.isCategoryModal) {
      this.dbs.deleteCategory(this.data.formData._id).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (error) => {
          console.log('Error while deleting category', error);
        }
      );
    }
  }
}
