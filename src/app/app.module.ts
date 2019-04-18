import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProblemsComponent } from './problems/problems.component';
import { EditorComponent } from './editor/editor.component';
import { CompaniesComponent } from './companies/companies.component';
import { TagsComponent } from './tags/tags.component';
import { AdminProblemsComponent } from './admin/admin-problems/admin-problems.component';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDashboardComponent } from './my/my-dashboard/my-dashboard.component';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { mockBackendProvider } from './mock-backend/mock-auth';
import { FormsModule }   from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { ProblemFormComponent } from './admin/problem-form/problem-form.component';
import { ProblemService } from './services/problem.service';
import { DataTableModule } from 'angular7-data-table';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProblemsComponent,
    EditorComponent,
    CompaniesComponent,
    TagsComponent,
    AdminProblemsComponent,
    LoginComponent,
    MyDashboardComponent,
    ProblemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'problems', component: ProblemsComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'editor', component: EditorComponent },
      { path: 'login', component: LoginComponent },
      { path: 'my/dashboard', component: MyDashboardComponent },
      { path: 'admin/problems', component: AdminProblemsComponent },
      { path: 'admin/problems/new', component: ProblemFormComponent }

    ]),
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    DataTableModule
  ],
  providers: [
    AuthService,
    ProblemService,

    // mock
    mockBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
