import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from 'src/app/Interfaces/sale';
import { Product } from 'src/app/Interfaces/product';
import { SaleDetail } from 'src/app/Interfaces/sale-detail';
import { SaleService } from 'src/app/Services/sale.service';
import { ProductService } from 'src/app/Services/product.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})

export class SaleComponent implements OnInit {

  productList: Product[] = [];
  productListFilter: Product[] = [];
  productListSale: SaleDetail[] = [];
  productSelect!: Product;
  paymentType: string = "Cash";
  totalSale: number = 0;
  buttonBlock: boolean = false;
  formProductSale: FormGroup;
  columnsTable: string[] = ['product', 'quantity', 'price', 'total', 'actions'];
  saleDetailsData = new MatTableDataSource(this.productListSale);

  productsFiltersReturn(search: any): Product[] {
    const searchValue = typeof search === "string" ? search.toLocaleLowerCase() : search.name.toLocaleLowerCase();
    return this.productList.filter(item => item.name.toLocaleLowerCase().includes(searchValue));
  }

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _saleService: SaleService,
    private _utilitiesService: UtilitiesService
  ) {

    this.formProductSale = this._fb.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this._productService.List().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const list = response.data as Product[];
          this.productList = list.filter(p => p.isActive == 1 && p.stock > 0);
        }
      },
      error: (e) => { }
    })

    this.formProductSale.get('product')?.valueChanges.subscribe(value => {
      this.productListFilter = this.productsFiltersReturn(value);
    })

  }

  ngOnInit(): void {
  }

  showProduct(product: Product): string {
    return product.name;
  }

  productForSale(event: any) {
    this.productSelect = event.option.value;
  }

  addProductForSale() {
    const _quantity: number = this.formProductSale.value.quantity;
    const _price: number = parseFloat(this.productSelect.price);
    const _total: number = _quantity * _price;
    this.totalSale = this.totalSale + _total;

    this.productListSale.push({
      productId: this.productSelect.productId,
      productDescription: this.productSelect.name,
      quantity: _quantity,
      price: String(_price.toFixed(2)),
      total: String(_total.toFixed(2))
    })

    this.saleDetailsData = new MatTableDataSource(this.productListSale);
    this.formProductSale.patchValue({
      product: '',
      quantity: ''
    })
  }

  deleteProduct(detail: SaleDetail) {
    this.totalSale = this.totalSale - parseFloat(detail.total);
    this.productListSale = this.productListSale.filter(p => p.productId != detail.productId);
    this.saleDetailsData = new MatTableDataSource(this.productListSale);
  }

  registerSale() {
    if (this.productListSale.length > 0) {
      this.buttonBlock = true;

      const request: Sale = {
        paymentType: this.paymentType,
        total: String(this.totalSale.toFixed(2)),
        saleDetails: this.productListSale
      }

      this._saleService.Register(request).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.totalSale = 0.00;
            this.productListSale = [];
            this.saleDetailsData = new MatTableDataSource(this.productListSale);

            Swal.fire({
              icon: 'success',
              title: 'Sale registered',
              text: `Sale number:${response.data.documentNumeber}`
            })
          } else {
            this._utilitiesService.showAlert("Error registering sale", "Error");
          }
        },
        complete: () => {
          this.buttonBlock = false;
        },
        error: (e) => { console.log(e) }
      })
    }
  }
}
