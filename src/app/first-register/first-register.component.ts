import { Component, inject, OnDestroy } from '@angular/core';
import { Address, CartDTO, UserDataDTO } from '../DTOS/indexDTO';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserDataService } from '../services/userdata.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-first-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './first-register.component.html',
  styleUrl: './first-register.component.css'
})
export class FirstRegisterComponent implements OnDestroy{
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  errors: string[] = [];
  userDataService = inject(UserDataService);
  cartService = inject (CartService);
  emptyNumberArray: number[] = [];
  private userDataServiceSubscribe= new Subscription ;
  private cartServiceSubscribe= new Subscription;
  userDataFailed: boolean = false;
  userData = this.formBuilder.group({
  userId: "",
  userNameTitles: "",
  userFirstName: ['', [Validators.required]],
  userLastName: ['', [Validators.required]],
  userAddress: this.formBuilder.group<Address>({
    city: '',
    street: '',
    houseNumber: '',
    postCode: ''
  }),
  userLastPurchaseCategory:""
 })
  cart :CartDTO ={ cartId: "",
    productIds:  this.emptyNumberArray,
    productCount: this.emptyNumberArray
  }
    

 public registerData(_: any) {
  if (!this.userData.valid) {
    return;
  }
  this.userDataFailed = false;
  this.errors = [];
  
  const userDTO = this.userData.value as UserDataDTO;
  this.userDataServiceSubscribe =this.userDataService.createUserData(userDTO).subscribe({
    next: () => {
      // TODO: notification
      
    },
    error: (err) => {
      console.error(err);
    }
  });
  console.log(this.cart);
  this.cartServiceSubscribe = this.cartService.creatCart(this.cart).subscribe({
    next: () => {
      // TODO: notification
      this.router.navigateByUrl('/list-products');
    },
    error: (err) => {
      console.error(err);
    }
  });
  
}
ngOnDestroy(): void {
  this.userDataServiceSubscribe.unsubscribe();
  this.cartServiceSubscribe.unsubscribe();
}
}
   
