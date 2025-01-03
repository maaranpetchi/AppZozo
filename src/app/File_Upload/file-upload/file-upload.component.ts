import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VideoUploadDialogComponent } from '../video-upload-dialog/video-upload-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private dialog: MatDialog) {}

  dialogRef: MatDialogRef<VideoUploadDialogComponent> | null = null;


  openUploadDialog(): void {
    if (this.dialogRef) {
      return;
    }

    this.dialogRef = this.dialog.open(VideoUploadDialogComponent, {
    
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log('File uploaded:', this.selectedFile.name);
      // Add your upload logic here
    }
  }
}
