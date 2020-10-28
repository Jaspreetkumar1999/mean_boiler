import { AuthserviceService } from './../../authservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading : boolean = false
  constructor(
    public authService : AuthserviceService
  ) { }

  ngOnInit(): void {
  }
  onLogin(form : NgForm){

    // console.log("form ->", form);
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);


  }

}
