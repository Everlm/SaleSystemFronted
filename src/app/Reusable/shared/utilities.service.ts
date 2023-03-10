import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Session } from 'src/app/Interfaces/session';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private _snackBar: MatSnackBar) { }

  showAlert(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })

  }

  saveSessionUser(sessionUser: Session) {
    localStorage.setItem("user", JSON.stringify(sessionUser));
  }

  getSessionUser() {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data!);
    return user;
  }

  deleteSessionUser() {
    localStorage.removeItem("user")
  }
}
