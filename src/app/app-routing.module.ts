import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './File_Upload/file-upload/file-upload.component';
import { VideoMetaDataManagementComponent } from './File_Upload/video-meta-data-management/video-meta-data-management.component';

const routes: Routes = [
  {path:'', redirectTo: '/file-upload',pathMatch: 'full'},
  {path:'file-upload' ,component:FileUploadComponent},
  {path:'VideoMetaData', component:VideoMetaDataManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
