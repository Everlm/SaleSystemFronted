import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../../Modals/user-modal/user-modal.component';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  columnsTable: string[] = ['fullName', 'email', 'roleDescription', 'status', 'actions'];
  initialData: User[] = [];
  userListData = new MatTableDataSource(this.initialData);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _userService: UserService,
    private _utilitiesService: UtilitiesService
  ) { }

  getUsers() {
    this._userService.List().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.userListData.data = response.data;
        } else {
          this._utilitiesService.showAlert("No found", "Error")
        }
      },
      error: (e) => { }
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.userListData.paginator = this.tablePagination;
  }

  filterTable(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value;
    this.userListData.filter = valueFilter.trim().toLocaleLowerCase();
  }

  newUser() {
    this.dialog.open(UserModalComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result == "true") {
        this.getUsers();
      }
    });
  }

  editUser(user: User) {
    this.dialog.open(UserModalComponent, {
      disableClose: true,
      data: user
    }).afterClosed().subscribe(result => {
      if (result == "true") {
        this.getUsers();
      }
    });
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Sure?',
      text: user.fullName,
      icon: "warning",
      confirmButtonColor: '#d33',
      confirmButtonText: "Yes, delete",
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No,Back'
    }).then(result => {
      if (result.isConfirmed) {
        this._userService.Delete(user.userId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this._utilitiesService.showAlert("User deleted", "Successfully");
              this.getUsers();
            } else {
              this._utilitiesService.showAlert("Error at delete", "Error");
            }
          },
          error: (e) => { }
        })
      }
    })
  }

}
