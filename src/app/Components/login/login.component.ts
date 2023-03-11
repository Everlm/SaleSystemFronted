import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login';
import { UserService } from 'src/app/Services/user.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private _utilitiesService: UtilitiesService
  ) {

    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.showLoading = true;
    const request: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    this._userService.Login(request).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this._utilitiesService.saveSessionUser(response.data);
          this.router.navigate(["pages"])
        } else {
          this._utilitiesService.showAlert("No found", "Error")
        }
      },
      complete: () => {
        this.showLoading = false;
      },
      error: () => {
        this._utilitiesService.showAlert("Error", "Error")
      }
    })
  }

}
