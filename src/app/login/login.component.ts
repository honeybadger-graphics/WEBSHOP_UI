import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDTO } from '../DTOS/indexDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }
 authService = inject(AuthService);
 private authServiceSub= new Subscription ;
 router = inject(Router);
 isLoggedIn: boolean = false;
  formBuilder = inject(FormBuilder);
 ngOnInit(): void{
  if(localStorage.getItem('accessToken')!== null){
   this.isLoggedIn = true;
  }
}
loginData = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
});
logIn(_: any){
  const user = this.loginData.value as UserDTO
  console.log(user);
  
      this.authServiceSub = this.authService.login(user).subscribe({
        next:(response) =>{
        console.log(response);
        localStorage.setItem('tokenType', response.tokenType);
        localStorage.setItem('accessToken', response.accessToken);
        //console.log(localStorage.getItem("accessToken"));
        this.router.navigateByUrl('/list-products');
      },
      error: (err) => {
        console.error(err);
      }
        //
      })
    }
   
 logOut(_: any){
  localStorage.removeItem('accessToken');
  this.isLoggedIn= false;
 }
}
