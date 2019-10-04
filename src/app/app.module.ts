import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';;
import { StoryFeedComponent } from './story-feed/story-feed.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { WriteStoryComponent } from './write-story/write-story.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {GroupsComponent} from "./groups/groups.component";
import { CategoriesService } from './_services/categories.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";;
import { SingleStoryComponent } from './single-story/single-story.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular-6-social-login";
// Configs 
export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
         
          {
            id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider("82023436782-p0l5v30vu06ns6ljkq86614i3k5vjbui.apps.googleusercontent.com")
            provider: new GoogleLoginProvider("503235193506-qridplkjaj97eptq18gafsv65ems1ama.apps.googleusercontent.com")
          },
           
        ]
    );
    return config;
  }
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        GooglePlaceModule,
        routing,
        SocialLoginModule,
        BsDatepickerModule.forRoot() ,
        BrowserAnimationsModule   ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent ,
        FooterComponent ,
        BlogComponent ,
        ContactComponent ,
        StoryFeedComponent,
        WriteStoryComponent,
        MyStoriesComponent,
        MyProfileComponent ,GroupsComponent , SingleStoryComponent , PagenotfoundComponent ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        CategoriesService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
          },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }