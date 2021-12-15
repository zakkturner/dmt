import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';

const routes: Routes = [
  { path: 'posts', component: PostComponent },
  { path: 'posts/:id', component: SinglePostComponent },
  { path: '**', redirectTo: 'posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
