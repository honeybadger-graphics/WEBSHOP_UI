import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../DTOS/indexDTO';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  productService = inject(ProductService);
  updataProduct = false;
  createProduct = false;
  productLoaded = false;
  description:string[]= [];
  router = inject(Router);
  productDTO: ProductDTO ={
    productId: 0,
    productName: '',
    productDescription: [],
    productCategory: '',
    productImage: '',
    productPrice: 0,
    productBasePrice: 0,
    isProductPromoted: false,
    isProductOnSale: false
  };
  activedRoute = inject(ActivatedRoute);
  productSearchForm = this.formBuilder.group({
    productId: 0,
  });

  productForm = this.formBuilder.group({
    productId: 0,
    productName: "",
    productCategory: "",
    productImage:  "",
    productPrice: 0,
    productBasePrice: 0,
    isProductPromoted: "false",
    isProductOnSale: "false",
  });
  productDiscForm = this.formBuilder.group({
    productDescription1: "",
    productDescription2: "",
    productDescription3: "",
  })

  isNewProduct = true;

  ngOnInit(): void {
    
      /*this.productService.getOne(id).subscribe({
        next: (product) => this.productForm.setValue(product),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });*/
    
  }
  search(){
    this.productService.getProdById(this.productSearchForm.value.productId as number).subscribe({
      next: (product) => {
        this.productForm.setValue({
          productId: product.productId,
          productName: product.productName,
          productCategory: product.productCategory,
          productImage: product.productImage,
          productPrice: product.productPrice,
          productBasePrice: product.productBasePrice,
          isProductOnSale: product.isProductOnSale.toString(),
          isProductPromoted: product.isProductPromoted.toString()
        });
        console.log(product.productDescription.at(0))
        this.productDiscForm.setValue({
        productDescription1: product.productDescription.at(0) as string,
        productDescription2: product.productDescription.at(1) as string,
        productDescription3: product.productDescription.at(2) as string
        });
        this.productLoaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  create(){
    this.createProduct = true;
    this.updataProduct = false;
  }
  update(){
    this.updataProduct = true;
    this.createProduct = false;
  }

  saveProduct() {
    //this.productDTO.productId = this.productForm.value.productId as number;
    this.productDTO.productName = this.productForm.value.productName as string;
    this.productDTO.productCategory = this.productForm.value.productCategory as string;
    this.productDTO.productImage = this.productForm.value.productImage as string;
    this.productDTO.productBasePrice = this.productForm.value.productBasePrice as number;
    this.productDTO.productPrice = this.productForm.value.productPrice as number;
    this.productDTO.isProductOnSale = this.stringToBoolean(this.productForm.value.isProductOnSale as string);
    this.productDTO.isProductPromoted = this.stringToBoolean(this.productForm.value.isProductPromoted as string);
    this.description.push(this.productDiscForm.value.productDescription1 as string);
    this.description.push(this.productDiscForm.value.productDescription2 as string);
    this.description.push(this.productDiscForm.value.productDescription3 as string);
    this.productDTO.productDescription = this.description;
    console.log(this.productDTO)
    if(!this.updataProduct){
      this.productService.createProduct(this.productDTO).subscribe({
        next: () => {
          // TODO: notification
         
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else{
      this.productDTO.productId = this.productForm.value.productId as number;
      this.productService.updateProduct(this.productDTO).subscribe({
        next: () => {
          // TODO: notification
         
        },
        error: (err) => {
          console.error(err);
        }
      });

    }
  }
    stringToBoolean(str: string): boolean {
      const truePattern: RegExp = /^(true|yes|1)$/i;
      const falsePattern: RegExp = /^(false|no|0)$/i;
  
      if (truePattern.test(str)) {
          return true;
      } else if (falsePattern.test(str)) {
          return false;
      } else {
          throw new Error('Invalid boolean string');
      }
  }    
  }
