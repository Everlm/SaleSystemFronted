import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UserComponent } from './Pages/user/user.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { SaleHistoryComponent } from './Pages/sale-history/sale-history.component';
import { ReportComponent } from './Pages/report/report.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'dashboard', component: DashBoardComponent },
    { path: 'users', component: UserComponent },
    { path: 'products', component: ProductComponent },
    { path: 'sales', component: SaleComponent },
    { path: 'sale_history', component: SaleHistoryComponent },
    { path: 'report', component: ReportComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
