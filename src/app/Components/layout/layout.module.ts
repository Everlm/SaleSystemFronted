import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UserComponent } from './Pages/user/user.component';
import { ProductComponent } from './Pages/product/product.component';
import { SaleComponent } from './Pages/sale/sale.component';
import { SaleHistoryComponent } from './Pages/sale-history/sale-history.component';
import { ReportComponent } from './Pages/report/report.component';
import { SharedModule } from 'src/app/Reusable/shared/shared.module';


@NgModule({
  declarations: [
    DashBoardComponent,
    UserComponent,
    ProductComponent,
    SaleComponent,
    SaleHistoryComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
