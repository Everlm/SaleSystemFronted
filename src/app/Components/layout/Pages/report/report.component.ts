import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import * as XLSX from "xlsx";
import { SaleService } from 'src/app/Services/sale.service';
import { Report } from 'src/app/Interfaces/report';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MMM/YYYY'
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }
  ]
})
export class ReportComponent implements OnInit {

  formFilter: FormGroup;
  listSaleReport: Report [] = [];
  columnsTable: string[] = ['creationDate', 'documentNumeber', 'paymentType', 'totalSale', 'product', 'quantity', 'price', 'totalProduct'];
  dataSaleReport = new MatTableDataSource(this.listSaleReport);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;


  constructor(
    private _fb: FormBuilder,
    private _saleService: SaleService,
    private _utilitiesService: UtilitiesService
  ) {
    this.formFilter = this._fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSaleReport.paginator = this.tablePagination;
  }

  searchSales() {
    const _startDate = moment(this.formFilter.value.startDate).format('DD/MM/YYYY');
    const _endDate = moment(this.formFilter.value.endDate).format('DD/MM/YYYY');

    if (_startDate === "Invalid date" || _endDate === "Invalid date") {
      this._utilitiesService.showAlert("All dates are required", "Error")
      return;
    }
    this._saleService.Report(
      _startDate,
      _endDate
    ).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.listSaleReport = response.data;
          this.dataSaleReport.data = response.data;
        } else {
          this.listSaleReport = [];
          this.dataSaleReport.data = [];
          this._utilitiesService.showAlert("not found", "Error")
        }
      },
      error: (e) => { console.log(e) }
    })

  }

  exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listSaleReport);

    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "Sale Report.xlsx");
  }


}
