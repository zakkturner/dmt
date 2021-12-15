import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogUrl = 'http://dmtsite.local/';

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = `${this.blogUrl}/wp-json/wp/v2/posts?_embed`;
    return this.http.get(url);
  }

  getSinglePosts(id: any) {
    const url = `${this.blogUrl}/wp-json/wp/v2/posts/${id}`;
    return this.http.get(url);
  }
}
