import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoMetaDataManagementComponent } from './File_Upload/video-meta-data-management/video-meta-data-management.component';
import { FileUploadComponent } from './File_Upload/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule } from '@angular/material/dialog';
import { VideoUploadDialogComponent } from './File_Upload/video-upload-dialog/video-upload-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './Spinner/spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthConfigModule } from './auth/auth-config.module';
import { LoginComponent } from './File_Upload/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    VideoMetaDataManagementComponent,
    VideoUploadDialogComponent,
    FileUploadComponent,
    SpinnerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridModule,
    MatTooltipModule,
    AuthConfigModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
