import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './http.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectsArchivesComponent } from './pages/projects-archives/projects-archives.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { CreateProjectFormComponent } from './components/create-project-form/create-project-form.component';
import { SearchprojectComponent } from './components/searchproject/searchproject.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    DashboardComponent,
    HeaderComponent,
    ProjectsArchivesComponent,
    CreateProjectComponent,
    CreateProjectFormComponent,
    SearchprojectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi:true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
