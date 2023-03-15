import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ModalSaleDetailComponent } from '../../Modals/modal-sale-detail/modal-sale-detail.component';
import { Sale } from 'src/app/Interfaces/sale';
import { SaleService } from 'src/app/Services/sale.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';
import * as moment from 'moment';

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
  selector: 'app-sale-history',
  templateUrl: './sale-history.component.html',
  styleUrls: ['./sale-history.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }
  ]
})
export class SaleHistoryComponent implements OnInit, AfterViewInit {

  formSearch: FormGroup;
  searchOptions: any[] = [
    { value: "date", description: "For Date" },
    { value: "number", description: "Sale Number" }
  ]
  columnsTable: string[] = ['creationDate', 'documentNumeber', 'paymentType', 'total', 'actions']
  dataInitial: Sale[] = [];
  saleListData = new MatTableDataSource(this.dataInitial);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _saleService: SaleService,
    private _utilitiesService: UtilitiesService

  ) {
    this.formSearch = this._fb.group({
      searchFor: ['date'],
      number: [''],
      startDate: [''],
      endDate: ['']
    })

    this.formSearch.get("searchFor")?.valueChanges.subscribe(value => {
      this.formSearch.patchValue({
        number: "",
        startDate: "",
        endDate: ""
      })
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.saleListData.paginator = this.tablePagination;
  }

  filterTable(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value;
    this.saleListData.filter = valueFilter.trim().toLocaleLowerCase();
  }

  searchSales() {
    let _startDate: string = "";
    let _endDate: string = "";

    if (this.formSearch.value.searchFor === "date") {
      _startDate = moment(this.formSearch.value.startDate).format('DD/MM/YYYY');
      _endDate = moment(this.formSearch.value.endDate).format('DD/MM/YYYY');

      if (_startDate === "Invalid date" || _endDate === "Invalid date") {
        this._utilitiesService.showAlert("All dates are required", "Error")
        return;
      }
    }

    this, this._saleService.GetHistory(
      this.formSearch.value.searchFor,
      this.formSearch.value.number,
      _startDate,
      _endDate
    ).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.saleListData = response.data;
        } else {
          this._utilitiesService.showAlert("No found", "Error")
        }
      },
      error: (e) => { console.log(e) }
    })
  }

  showSaleDetail(_sale:Sale){
    this._dialog.open(ModalSaleDetailComponent,{
      data:_sale,
      disableClose:true,
      width:'700px'
    })
  }

}
