import { inject, Injectable } from '@angular/core';
import { AdminDTO, UserDataDTO } from '../DTOS/indexDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService  {

  private baseUrl = 'https://localhost:7161/api/UserData/';
  http = inject(HttpClient);   
    createUserData(userData: UserDataDTO) {
      return this.http.post(this.baseUrl+'CreateUserData',userData,{
        headers: {
          Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
        }
      });    
    }
    getUserData() {
      return this.http.get<UserDataDTO>(this.baseUrl+'GetUserDataInformation',{
        headers: {
          Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
        }
      });    
    }
    updateUserData(userData: UserDataDTO){
      return this.http.post(this.baseUrl+'UpdateUserData',userData,{
        headers: {
          Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
        }
      });
    }
    addAdmin(adminDTO: AdminDTO){
      return this.http.post(this.baseUrl+'AddUserToAdmins',adminDTO,{
        headers: {
          Authorization: localStorage.getItem('tokenType')+' ' + localStorage.getItem('accessToken')
        }
      });
    }
}
