
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterPayload } from '../register-payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerPayload!: RegisterPayload;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) { 
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
    this.registerPayload={
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.registerPayload.username = this.registerForm.get('username')?.value;
    this.registerPayload.email = this.registerForm.get('email')?.value;
    this.registerPayload.password = this.registerForm.get('password')?.value;
    this.registerPayload.repeatPassword = this.registerForm.get('repeatPassword')?.value;

    this.authService.register(this.registerPayload).subscribe(data=>{
      console.log('register success');
      this.router.navigateByUrl("/register-success");
    }, error=>{
      console.log('register failed');
    });
  }

}
