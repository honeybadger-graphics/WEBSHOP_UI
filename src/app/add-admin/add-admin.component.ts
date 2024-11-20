import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { AdminDTO } from '../DTOS/indexDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  userDataService = inject(UserDataService);
  formInput = inject(FormBuilder);
  router = inject(Router);
  AdminDTO: AdminDTO = {
    userEmail: ''
  }
  input = this.formInput.group({
   email:'',
  })
  add(_:any){
    this.AdminDTO.userEmail =this.input.value.email! 
     this.userDataService.addAdmin(this.AdminDTO).subscribe({next:() =>  this.router.navigateByUrl('/list-products')});
    }
   }

