import { AuthserviceService } from './auth/authservice.service';
import { Component, OnInit } from '@angular/core';
import {Post} from './post/post.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService : AuthserviceService
  ){}

  ngOnInit(){
   this.authService.autoAuthUser();
  }


}
