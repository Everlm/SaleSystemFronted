import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/Interfaces/category';
import { Product } from 'src/app/Interfaces/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { UtilitiesService } from 'src/app/Reusable/shared/utilities.service';


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  productForm: FormGroup;
  textAction: string = "Add";
  buttonAction: string = "Save"
  listCategories: Category[] = [];

  constructor(
    private _modalRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: Product,
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _utilitiesService: UtilitiesService
  ) {

    this.productForm = this._fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      isActive: ['1', Validators.required],
    });

    if (this.productData != null) {
      this.textAction = "Update";
      this.buttonAction = "Update";
    }

    this._categoryService.List().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.listCategories = response.data
        }
      },
      error: (e) => { }
    })
  }

  ngOnInit(): void {
    if (this.productData != null) {
      this.productForm.patchValue({
        name: this.productData.name,
        categoryId: this.productData.categoryId,
        stock: this.productData.stock,
        price: this.productData.price,
        isActive: this.productData.isActive.toString()
      })
    }
  }

  productSaveAndUpdate() {
    const _product: Product = {
      productId: this.productData == null ? 0 : this.productData.productId,
      name: this.productForm.value.name,
      categoryId: this.productForm.value.categoryId,
      categoryDescription: "",
      stock: this.productForm.value.stock,
      price: this.productForm.value.price,
      isActive: parseInt(this.productForm.value.isActive),
    }

    if (this.productData == null) {
      this._productService.Create(_product).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this._utilitiesService.showAlert("Register", "successfully");
            this._modalRef.close("true")
          } else {
            this._utilitiesService.showAlert("Register Error", "Error")
          }
        },
        error: (e) => { }
      })

    } else {
      this._productService.Edit(_product).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this._utilitiesService.showAlert("Update", "successfully");
            this._modalRef.close("true")
          } else {
            this._utilitiesService.showAlert("Update Error", "Error")
          }
        },
        error: (e) => { }
      })
    }
  }

}
