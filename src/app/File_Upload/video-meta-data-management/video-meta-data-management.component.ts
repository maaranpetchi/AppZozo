import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-video-meta-data-management',
  templateUrl: './video-meta-data-management.component.html',
  styleUrls: ['./video-meta-data-management.component.scss']
})
export class VideoMetaDataManagementComponent implements OnInit{
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;


 


  constructor(){}
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
   video:any = {
    title: '',
    originalTitle: '',
    description: '',
    category: '',
    genre: '',
    releaseYear: null,
    duration: '',
    language: '',
    contentRating: '',
    trailerUrl: '',
    tags: '',
    cast: []
  };


  newCast = { name: '', role: '' };

  categories = ['Action', 'Comedy', 'Drama', 'Horror'];
  genres = ['Adventure', 'Sci-Fi', 'Fantasy', 'Thriller'];
  languages = ['English', 'Spanish', 'French', 'German'];
  ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

  addCast() {
    if (this.newCast.name && this.newCast.role) {
      this.video.cast.push({ ...this.newCast });
      this.newCast = { name: '', role: '' };
    }
  }

  onSubmit() {
    console.log("Metod");
    
    const payload = { ...this.video };
    console.log('Payload:', payload);

    // Example: You can send this payload to a REST API
    // this.http.post('https://your-api-endpoint', payload).subscribe(response => {
    //   console.log('Response:', response);
    // });
  }

}