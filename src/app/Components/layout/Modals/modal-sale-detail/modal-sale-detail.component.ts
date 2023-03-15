import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SaleDetail } from 'src/app/Interfaces/sale-detail';
import { Sale } from 'src/app/Interfaces/sale';

@Component({
  selector: 'app-modal-sale-detail',
  templateUrl: './modal-sale-detail.component.html',
  styleUrls: ['./modal-sale-detail.component.css']
})
export class ModalSaleDetailComponent implements OnInit {

  creationDate: string = "";
  documentNumeber: string = "";
  paymentType: string = "";
  total: string = "";
  saleDetails: SaleDetail[] = [];
  columnsTable :string[]=['product','quantity','price','total'];

  constructor( @Inject(MAT_DIALOG_DATA) public _sale: Sale,) {
    this.creationDate = _sale.creationDate!;
    this.documentNumeber = _sale.documentNumeber!;
    this.paymentType = _sale.paymentType;
    this.total =_sale.total;
    this.saleDetails =_sale.saleDetails;
  }

  ngOnInit(): void {
  }

}
