import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
import { ProductModalComponent } from '../../Modals/product-modal/product-modal.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  columnsTable: string[] = ['name', 'category', 'stock', 'price', 'status', 'actions'];
  initialData: Product[] = [];
  productListData = new MatTableDataSource(this.initialData);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _utilitiesService: UtilitiesService
  ) { }

  getProducts() {
    this._productService.List().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.productListData.data = response.data;
        } else {
          this._utilitiesService.showAlert("No found", "Error")
        }
      },
      error: (e) => { }
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.productListData.paginator = this.tablePagination;
  }

  filterTable(event: Event) {
    const valueFilter = (event.target as HTMLInputElement).value;
    this.productListData.filter = valueFilter.trim().toLocaleLowerCase();
  }

  newProduct() {
    this._dialog.open(ProductModalComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result == "true") {
        this.getProducts();
      }
    });
  }

  editProduct(product: Product) {
    this._dialog.open(ProductModalComponent, {
      disableClose: true,
      data: product
    }).afterClosed().subscribe(result => {
      if (result == "true") {
        this.getProducts();
      }
    });
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: 'Sure?',
      text: product.name,
      icon: "warning",
      confirmButtonColor: '#d33',
      confirmButtonText: "Yes, delete",
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No,Back'
    }).then(result => {
      if (result.isConfirmed) {
        this._productService.Delete(product.productId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this._utilitiesService.showAlert("Product deleted", "Successfully");
              this.getProducts();
            } else {
              this._utilitiesService.showAlert("Error at delete", "Error");
            }
          },
          error: (e) => { }
        })
      }
    })
  }
}
