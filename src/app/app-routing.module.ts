import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
import { ShareStoryComponent } from './share-story/share-story.component';
import { StoryFeedSummaryComponent } from './story-feed-summary/story-feed-summary.component';
import { SelectYourStoryComponent } from './select-your-story/select-your-story.component';

const routes: Routes = [

  {
    path: 'home', component: HomeComponent,
  
},

  {
    path: 'story', component: StoryComponent,
  
},

{
  path: 'share-story', component: ShareStoryComponent,

},

{
  path: 'story-feed-summary', component: StoryFeedSummaryComponent,

},

{
  path: 'select-your-story', component: SelectYourStoryComponent,

},

  {
    path: 'login', component: LoginComponent,
  
},
     {
        path: 'register', component: RegisterComponent,
      
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
