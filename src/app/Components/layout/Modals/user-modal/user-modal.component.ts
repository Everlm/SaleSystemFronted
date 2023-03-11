import { Component, OnInit, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/Interfaces/role';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';
import { RoleService } from 'src/app/Services/role.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;
  hidePassword: boolean = true;
  textAction: string = "Add";
  buttonAction: string = "Save"
  listRoles: Role[] = [];

  constructor(
    private modalRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private fb: FormBuilder,
    private _roleService: RoleService,
    private _userService: UserService,
    private _utilitiesService: UtilitiesService
  ) {

    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      roleId: ['', Validators.required],
      password: ['', Validators.required],
      isActive: ['', Validators.required],
    });

    if (this.userData != null) {
      this.textAction = "Update";
      this.buttonAction = "Update";
    }

    this._roleService.List().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.listRoles = response.data
        }
      },
      error: (e) => { }
    })
  }

  ngOnInit(): void {
    if (this.userData != null) {
      this.userForm.patchValue({
        fullName: this.userData.fullName,
        email: this.userData.email,
        roleId: this.userData.roleId,
        password: this.userData.password,
        isActive: this.userData.isActive.toString()
      })
    }
  }

  userSaveAndUpdate() {
    const _user: User = {
      userId: this.userData == null ? 0 : this.userData.userId,
      fullName: this.userForm.value.fullName,
      email: this.userForm.value.email,
      roleId: this.userForm.value.roleId,
      roleDescription: "",
      password: this.userForm.value.password,
      isActive: parseInt(this.userForm.value.isActive),
    }

    if (this.userData == null) {
      this._userService.Create(_user).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this._utilitiesService.showAlert("Register", "successfully");
            this.modalRef.close("true")
          } else {
            this._utilitiesService.showAlert("Register Error", "Error")
          }
        },
        error: (e) => { }
      })

    } else {
      this._userService.Edit(_user).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this._utilitiesService.showAlert("Update", "successfully");
            this.modalRef.close("true")
          } else {
            this._utilitiesService.showAlert("Update Error", "Error")
          }
        },
        error: (e) => { }
      })

    }

  }


}
