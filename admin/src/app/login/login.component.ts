// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: AuthService,
    private router: Router
  ) {}

  resData:any;
  ngOnInit(): void {
    if (localStorage.getItem('userInfo')) {
      this.router.navigate(['products']);
    }
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['',[Validators.required,Validators.minLength(6)]],
    });
  }
  get formControls(){
    return this.loginForm.controls
  }

  login() {
    const val = this.loginForm.value;
    if (this.loginForm.valid) {
      this.http.login(val.email, val.password).subscribe(
        result => {
          if(result!=null){

            this.resData=result
            localStorage.setItem('token', this.resData.token);
            console.log(result);
            console.log(this.resData.token);

            this.router.navigate(['products']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
