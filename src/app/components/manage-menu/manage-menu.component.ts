import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageMenuDialogComponent } from '../manage-menu-dialog/manage-menu-dialog.component';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss'],
})
export class ManageMenuComponent {
  menu = [
    {
      name: 'Seafood',
      items: [
        {
          name: 'Grilled Salmon',
          description:
            'A succulent grilled salmon fillet seasoned to perfection.',
          category: 'Seafood',
          price: 19.99,
          imageURL:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          availability: true,
        },
        {
          name: 'Ribeye Steak',
          description:
            'A succulent grilled salmon fillet seasoned to perfection.',
          category: 'Seafood',
          price: 29.99,
          imageURL:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          availability: true,
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  openMenuModal(e: MouseEvent, modalType: string, formData?: any) {
    e.stopPropagation();
    let modalTitle = '';
    if (modalType === 'editCategory') {
      modalTitle = 'Edit Category';
    } else if (modalType === 'addCategory') {
      modalTitle = 'Add Category';
    } else if (modalType === 'editMenuItem') {
      modalTitle = 'Edit Menu Item';
    } else {
      modalTitle = 'Add Menu Item';
    }
    this.dialog.open(ManageMenuDialogComponent, {
      data: { modalType, modalTitle, formData },
    });
  }
}
