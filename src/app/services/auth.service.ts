import { HttpClient} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { LoginResponseDTO, UserDTO } from "../DTOS/indexDTO";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private baseUrl = 'https://localhost:7161/api/User/';
    http = inject(HttpClient);
  
    register(user: UserDTO) {
      return this.http.post<UserDTO>(this.baseUrl+'register', user);    
    }
  
    login(user: UserDTO) {
      return this.http.post<LoginResponseDTO>(this.baseUrl+'login', user);    
    }
  }