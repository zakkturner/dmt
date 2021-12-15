import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  blogPosts: any;
  constructor(private blogService: BlogService) {}
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    this.blogService.getPosts().subscribe((data) => {
      console.log(data);
      this.blogPosts = data;
    });
  }
}
