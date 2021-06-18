import { Injectable } from "@angular/core";
import { RegisterPayload } from './register-payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from './login-payload';
import { JwtAuthResponse } from './jwt-auth-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { UserPayload } from './login/userPayload';
import { environment } from 'src/environments/environment.prod';
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    url =  environment.baseUrl;
    userPayload! : UserPayload;
    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService){}
    register(registerPayload: RegisterPayload):Observable<any>{
        return this.httpClient.post(this.url + "/auth/signup", registerPayload);
    }

    login(loginPayload : LoginPayload):Observable<boolean>{
        return this.httpClient.post<JwtAuthResponse>(this.url + "/auth/login", loginPayload).pipe(map(data=>{
            console.log(data.authenticationToken);
            this.localStorageService.store('authenticationToken',data.authenticationToken);
            this.localStorageService.store('username',data.username);
            return true;
        }));
    }
   
    getUserByUsername(username : String):Observable<UserPayload>{
        return this.httpClient.get<UserPayload>(this.url + "/user/get/"+ username);
    }

    getRolenameLocalStorageService(username: String){

        this.getUserByUsername(username).subscribe((data:UserPayload)=>{
            this.localStorageService.store('rolename', data.roleName);
          }, (err:any)=>{
            console.log(" getUserByUsername() Failure response");
          });
        
    }
    isAuthenticated():Boolean{
        return this.localStorageService.retrieve('userName') != null;
    }
    isAuthenticatedRoleUser():Boolean{
        return this.localStorageService.retrieve('rolename') == "ROLE_USER";
    }
    logout(){
        this.localStorageService.clear("authenticationToken");
        this.localStorageService.clear("username");
        this.localStorageService.clear("rolename");
    }
}