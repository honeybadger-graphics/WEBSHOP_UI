import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockDTO, ProductDTO, StockUpdateDTO } from '../DTOS/indexDTO';
import { ProductService } from '../services/product.service';
import { StockService } from '../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modify-stock.component.html',
  styleUrl: './modify-stock.component.css'
})
export class ModifyStockComponent {
  stockService = inject(StockService);
  productService = inject(ProductService)
  formInput = inject(FormBuilder);
   updateDTO: StockUpdateDTO = {
     productId: 0,
     productStocks: 0
   }; 
  input = this.formInput.group({
   prodName: "",
   stockChange: 0,
  })
  update(_:any){
    const name = this.input.value.prodName as string;
    this.productService.getProdByName(name).subscribe({ next: (productResponse)=> {
      console.log(productResponse.productId)
      this.updateDTO.productId = productResponse.productId as number;
      console.log(this.updateDTO.productId)
      this.updateDTO.productStocks = this.input.value.stockChange as number;
   this.stockService.StockUpdate(this.updateDTO).subscribe();
    }})
  }
}
