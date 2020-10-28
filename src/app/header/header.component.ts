import { Subscription } from 'rxjs';
import { AuthserviceService } from './../auth/authservice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authlistnerSubs : Subscription;

  constructor(
    private authService : AuthserviceService
  ) { }

  ngOnInit(): void {
    this.userIsAuthenticated =  this.authService.getIsAuth();
    this.authlistnerSubs = this.authService.getAuthStatusListner()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated
    })

  }
  onLogout(){
    this.authService.logOut();
  }
  ngOnDestroy(){
   this.authlistnerSubs.unsubscribe();
  }
}
