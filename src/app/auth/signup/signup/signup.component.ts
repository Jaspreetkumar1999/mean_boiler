import { AuthserviceService } from './../../authservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading : boolean = false

  constructor(
    public authService : AuthserviceService
  ) { }

  ngOnInit(): void {
  }
  onSignUp(form : NgForm){
    // console.log("form =>", form);
    if(form.invalid){
      return
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password)


  }

}
