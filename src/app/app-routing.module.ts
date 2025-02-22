import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './File_Upload/file-upload/file-upload.component';
import { VideoMetaDataManagementComponent } from './File_Upload/video-meta-data-management/video-meta-data-management.component';
import { SpinnerComponent } from './Spinner/spinner/spinner.component';
// import { AuthGuard } from './auth/AuthGuard ';
import { LoginComponent } from './File_Upload/login/login.component';
import { VideoUploadDialogComponent } from './File_Upload/video-upload-dialog/video-upload-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'file-upload', component: FileUploadComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  { path: 'VideoMetaData', component: VideoMetaDataManagementComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: 'videoUpload', component: VideoUploadDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
