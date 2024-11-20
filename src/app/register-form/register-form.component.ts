import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from '../DTOS/indexDTO';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  authService = inject(AuthService);

  router = inject(Router);
  private authServiceSubscribe= new Subscription ;
  private authServiceSubscribe2= new Subscription;
  formBuilder = inject(FormBuilder);
  activedRoute = inject(ActivatedRoute);
  errors: string[] = [];
  registerForm!:FormGroup;
  registerFailed: boolean = false;
  registerSucceeded: boolean = false;
  signedIn: boolean = false;
 
  registerData = this.formBuilder.group<UserDTO>({
    email: "",
    password: "",
  });
  
  

  ngOnInit(): void {
    this.registerFailed = false;
    this.registerSucceeded = false;
    this.errors = [];
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      });
      if(localStorage.getItem('accessToken')!== null){
        this.signedIn = true;
       }
  }
  
  public register(_: any) {
      if (!this.registerForm.valid) {
        return;
      }
      this.registerFailed = false;
      this.errors = [];
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        this.registerFailed = true;
        this.errors.push('Passwords do not match.');
        return;
      }
      this.registerData.value.email = this.registerForm.value.email;
      this.registerData.value.password = this.registerForm.value.password;
      const user = this.registerData.value as UserDTO;
      this.authServiceSubscribe = this.authService.register(user).subscribe({
        next: () => {
          this.authServiceSubscribe2 = this.authService.login(user).subscribe({
            next:(response) =>{
            console.log(response);
            localStorage.setItem('tokenType', response.tokenType);
            localStorage.setItem('accessToken', response.accessToken);
            //console.log(localStorage.getItem("accessToken"));
            this.router.navigateByUrl('/new-register');
          }
            
            //
          })
        },
        error: (err) => {
          console.error(err);
        }
      })
          
    }
    ngOnDestroy(): void {
      this.authServiceSubscribe.unsubscribe();
      this.authServiceSubscribe2.unsubscribe();
    }
    
  }


