import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService, MenuType } from 'src/app/services/dashboard.service';
import { ManageMenuDialogComponent } from '../manage-menu-dialog/manage-menu-dialog.component';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss'],
})
export class ManageMenuComponent implements OnInit {
  // TODO: remove and re-use the menu.model
  menu!: MenuType[];

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.menu = this.dashboardService.getMenuDataByCategory();

    this.dashboardService.menuSubject.subscribe((data) => {
      this.menu = data;
    });
  }

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
