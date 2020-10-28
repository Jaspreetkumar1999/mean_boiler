import { AuthserviceService } from './../../auth/authservice.service';
import { PostsService } from './../posts.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import  {Post} from '../post.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] =[];
  isLoading = false;
  totalPosts = 10;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [ 1,2,5,10];
  userIsAuthenticated = false;
  userId : string;
  private postsSub : Subscription;
  private authStatusSub : Subscription
  constructor(
   public postsService :PostsService,
   public authService : AuthserviceService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.userId = this.authService.getUserId();
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.postsService.getPostUpdateListener()
    .subscribe((postData : { posts : Post[], postCount : number})=>{
      // console.log("posts", posts);
  this.isLoading = false
      this.posts = postData.posts;
      console.log("posts", this.posts);

      this.totalPosts = postData.postCount

    });

    this.userIsAuthenticated = this.authService.getIsAuth();

   this.authStatusSub =  this.authService.getAuthStatusListner()
   .subscribe(isAuthenticated =>{
     this.userIsAuthenticated = isAuthenticated ;
     this.userId = this.authService.getUserId();
   })
  }
  onDelete(postId : string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() =>{
      this.postsService.getPosts(this.postPerPage,this.currentPage)
    })


  }
  onChangedPage(pageData : PageEvent){
    this.isLoading = true;
    // console.log("pageData", pageData);
    this.currentPage = pageData.pageIndex +1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage)


  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }



}
