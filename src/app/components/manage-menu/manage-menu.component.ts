import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category, Menu } from 'src/app/models/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ManageMenuDialogComponent } from '../manage-menu-dialog/manage-menu-dialog.component';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss'],
})
export class ManageMenuComponent implements OnInit {
  // TODO: remove and re-use the menu.model
  menu!: any;
  isLoaded: boolean = false;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user?.userId) {
        this.dashboardService
          .getMenuDataByCategory(user.userId)
          .subscribe((data) => {
            console.log(data);
            this.menu = data;
            this.isLoaded = true;
          });
      }
    });
  }

  openMenuModal(
    e: MouseEvent,
    modalType: string,
    formData?: any,
    category?: Category
  ) {
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
      data: { modalType, modalTitle, formData, category },
    });
  }
}
