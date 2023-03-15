import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu';
import { MenuService } from 'src/app/Services/menu.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menuList: Menu[] = [];
  userEmail: string = "";
  userRole: string = "";

  constructor(
    private _router: Router,
    private _menuService: MenuService,
    private _utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {
    const user = this._utilitiesService.getSessionUser();

    if (user != null) {
      this.userEmail = user.email;
      this.userRole = user.roleDescription;

      this._menuService.List(user.userId).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.menuList = response.data;
          }
        },
        error: (e) => { console.log(e) }
      })
    }
  }

  logOut() {
    this._utilitiesService.deleteSessionUser();
    this._router.navigate(['login'])
  }


}
