import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-upload-dialog',
  templateUrl: './video-upload-dialog.component.html',
  styleUrls: ['./video-upload-dialog.component.scss']
})
export class VideoUploadDialogComponent  implements OnInit{
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;


 


  constructor( public dialogRef: MatDialogRef<VideoUploadDialogComponent>){}
  ngOnInit(): void {
    const elements = document.querySelectorAll('[aria-hidden]'); elements.forEach(element => { element.removeAttribute('aria-hidden'); });  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile,"selected file")
    }
  }
  deleteFile() {
    if (this.selectedFile) {
      this.selectedFile = null;
      // Reset the file input to allow selecting the same file again
      this.fileInput.nativeElement.value = '';
    }
  }
  uploadFile() {
    if (this.selectedFile) {
      console.log('File uploaded:', this.selectedFile.name);
      // Add your upload logic here
    }
  }


}
