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

import {MatTabsModule} from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
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
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DialogContentExampleDialog} from './editor/editor.component'
import {DialogContentExampleDialog4edit} from './editor/editor.component'
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { AdminNewproblemComponent } from './admin/admin-newproblem/admin-newproblem.component';
import { AdminEditproblemComponent } from './admin/admin-editproblem/admin-editproblem.component';
import { AdminDeleteproblemComponent } from './admin/admin-deleteproblem/admin-deleteproblem.component';
import {MatSelectModule} from '@angular/material/select';

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
    ProblemFormComponent,
    DialogContentExampleDialog,
    DialogContentExampleDialog4edit,
    SignupComponent,
    AdminNewproblemComponent,
    AdminEditproblemComponent,
    AdminDeleteproblemComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    AppRoutingModule,
    MatGridListModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'problems/:id', component: EditorComponent },
      { path: 'problems', component: ProblemsComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'my/dashboard', component: MyDashboardComponent },
      { path: 'admin/problems', component: AdminProblemsComponent },
      { path: 'admin/problems/new', component: AdminNewproblemComponent },
      { path: 'admin/problems/edit/:id', component: AdminEditproblemComponent },
      { path: 'admin/problems/delete/:id', component: AdminDeleteproblemComponent }

    ]),
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    DataTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    ProblemService,

    // mock
    mockBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogContentExampleDialog,
    DialogContentExampleDialog4edit
  ],
})
export class AppModule { }
