import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Address, UserDataDTO } from '../DTOS/indexDTO';

@Component({
  selector: 'app-read-modify-user-data',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './read-modify-user-data.component.html',
  styleUrl: './read-modify-user-data.component.css'
})
export class ReadModifyUserDataComponent implements OnInit {
  
  readUserData : boolean = true;
  formBuilder = inject(FormBuilder);
  userDataService = inject(UserDataService);
  userDataForm = this.formBuilder.group({
    userId: "",
    userNameTitles: "",
    userFirstName: ['', [Validators.required]],
    userLastName: ['', [Validators.required]],
    userAddress: this.formBuilder.group<Address>({
      city: '',
      street: '',
      houseNumber: '',
      postCode: ''}),
    userLastPurchaseCategory:""
   })
   userData!: UserDataDTO;
   ngOnInit(): void {
    this.userDataService.getUserData().subscribe({
      next:(userdata) => {
        this.userData = userdata;
        
    console.log(this.userData);
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
      
    });
  }
  modify(_:any){
    this.readUserData= false;
    console.log(this.readUserData);
    this.userDataForm.setValue(this.userData);
    console.log(this.userDataForm.value);
  }
  update(_:any){
    const userDataDTO = this.userDataForm.value as UserDataDTO
    this.userDataService.updateUserData(userDataDTO).subscribe({})
  }
}
