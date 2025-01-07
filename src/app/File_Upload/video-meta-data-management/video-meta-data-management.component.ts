import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
import { VideoDetailsServiceService } from 'src/app/services/video-details-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-video-meta-data-management',
  templateUrl: './video-meta-data-management.component.html',
  styleUrls: ['./video-meta-data-management.component.scss']
})
export class VideoMetaDataManagementComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  videoDetails: any
  updateVideoDetails: any;
  addCastMember:boolean=false;
  constructor(private http: HttpClient, private route: Router, private spinner: SpinnerService, private videoDetailsService: VideoDetailsServiceService) {
  }
  ngOnInit(): void {
    console.log(this.columnState,"columnState");
    
    const elements = document.querySelectorAll('[aria-hidden]'); elements.forEach(element => { element.removeAttribute('aria-hidden'); });
    if (this.columnState != '' && this.columnState != 'AddVideo') {
      console.log("columnState1");

      this.videoDetails = this.videoDetailsService.getVideoDetails();
      this.updateData();
    }
  }
  updateData() {
    if (this.categories.includes(this.videoDetails.category)) {
      this.video.category = this.videoDetails.category;
    }
    if (this.genres.includes(this.videoDetails.genre)) {
      this.video.genre = this.videoDetails.genre;
    }
    if (this.languages.includes(this.videoDetails.language)) {
      this.video.language = this.videoDetails.language;
    }
    if (this.ratings.includes(this.videoDetails.contentRating)) {
      this.video.contentRating = this.videoDetails.contentRating;
    }
    this.video.tags = this.videoDetails.tags;
    this.video.releaseYear = this.videoDetails.releaseYear;
    this.video.description = this.videoDetails.description;
    this.video.duration = this.videoDetails.duration;
    this.video.title = this.videoDetails.title;
    this.video.trailerUrl = this.videoDetails.trailerUrl;
    this.video.originalTitle = this.videoDetails.originalTitle;
    if (this.videoDetails.cast && Array.isArray(this.videoDetails.cast)) {
      this.video.cast = this.videoDetails.cast.map((castMember: any) => ({
        name: castMember.name,
        role: castMember.role
      }));
    }
    else {
      console.warn('Category from API is not in the available list');
    }
  }
  fileExtension: any;
  columnState: any = localStorage.getItem('currentPage');
  getFileResponse: any;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile, "selected file")
      const extension = this.selectedFile.name.slice(this.selectedFile.name.lastIndexOf('.') + 1);
      this.fileExtension = extension;
      this.getVideoDuration(this.selectedFile);
      let payload = {
        "fileName": this.selectedFile.name,
        "folderName": "Testing",
        "fileType": `video/${this.fileExtension}`
      }
      const headers = new HttpHeaders({
        'x-api-key': 'cr0SFV85Th6UZzC07tjqh9OjSk9rC6pD6GBQGLIM'
      });
      this.http.post<any>('https://9ptytxjeyf.execute-api.ap-south-1.amazonaws.com/Dev/GetPreSignedURL', payload, { headers }).subscribe(sendFileresponse => {
        this.getFileResponse = sendFileresponse.body.presignedUrl
      })
    }
  }
  private getVideoDuration(file: File): void {
    const video = document.createElement('video');
    const fileReader = new FileReader();
    fileReader.onload = () => {
      video.src = fileReader.result as string;
      video.onloadedmetadata = () => {
        const duration = video.duration;
        this.video.duration = this.formatDuration(duration);
      };
    };
    fileReader.readAsDataURL(file);
  }
  // Format the duration in HH:MM:SS format
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    let durationString = '';
  
    if (hours > 0) {
      durationString += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
  
    if (minutes > 0) {
      durationString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
  
    // Ensure that seconds are always displayed
    if (remainingSeconds > 0) {
      durationString += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
    } else if (minutes > 0 || hours > 0) {
      // To display 0 seconds if there are minutes or hours
      durationString += `0 seconds`;
    }
  
    return durationString.trim();
  }
  
  
  
  // Function to upload the file to S3
  uploadFileToS3(url: string, file: File): Observable<any> {
    const headers = {
      'Content-Type': `video/${this.fileExtension}`,
      'x-api-key': 'cr0SFV85Th6UZzC07tjqh9OjSk9rC6pD6GBQGLIM'
    };
    // Return the observable so it can be subscribed to outside the method
    return this.http.put(url, file, { headers, observe: 'response' });
  }
  deleteFile() {
    if (this.selectedFile) {
      this.selectedFile = null;
      // Reset the file input to allow selecting the same file again
      this.fileInput.nativeElement.value = '';
    }
  }
  video: any = {
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
    tags: [],
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
      this.addCastMember = true;
      this.newCast = { name: '', role: '' };
    }
  }

  deleteCast(index: number) {
    this.video.cast.splice(index, 1);  
  }

  newTag: string = '';  // For the tag input

  addTag() {
    if (this.newTag?.trim()) {
      // Add tag if it doesn't already exist
      if (!this.video.tags.includes(this.newTag.trim())) {
        this.video.tags.push(this.newTag.trim());
      }
      this.newTag = '';  // Clear input after adding
    }
  }
  onCancel() {
    // Add your cancel logic here
    this.route.navigate(['/file-upload']); // or wherever you want to navigate
  }


  removeTag(index: number) {
    this.video.tags.splice(index, 1);
  }

  onTagKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTag();
    }
  }
  onSubmit() {
    console.log(this.columnState, "this.columnState");
    
    // Check if we need file validation based on columnState
    const isFileRequired = this.columnState === 'AddVideo';
    const isFileValid = !isFileRequired || (this.getFileResponse && this.selectedFile);
    
    if (isFileValid) {
      // If file is selected or not required, proceed with the logic
      if (this.columnState === 'AddVideo') {
        // Handle file upload for AddVideo state
        this.uploadFileToS3(this.getFileResponse, this.selectedFile!).subscribe(
          this.handleS3Response.bind(this),
          this.handleS3Error.bind(this)
        );
      } else {
        // For other states, proceed directly with metadata update
        const payload = {
          fileName: this.selectedFile?.name || this.video.fileName, // Use existing filename if no new file
          newFields: { ...this.video },
        };
        this.updateVideoMetadata(payload);
      }
    } else {
      console.error("No file selected for AddVideo state.");
      this.spinner.requestEnded();
      Swal.fire({
        title: "Error!",
        text: "Please select a file before submitting.",
        icon: "error",
      });
    }
  }

  // Helper method to handle S3 response
  private handleS3Response(s3Response: any) {
    if (s3Response.status === 200) {
      const payload = {
        fileName: this.selectedFile?.name,
        newFields: { ...this.video },
      };
      this.updateVideoMetadata(payload);
    } else {
      console.error("S3 upload failed with status:", s3Response.status);
      Swal.fire({
        title: "Error!",
        text: "File upload to S3 failed.",
        icon: "error",
      });
    }
  }

  // Helper method to handle S3 error
  private handleS3Error(error: any) {
    console.error("Error during S3 upload:", error);
    this.spinner.requestEnded();
    Swal.fire({
      title: "Error!",
      text: "An error occurred during file upload to S3.",
      icon: "error",
    });
  }

  // Helper method to update video metadata
  private updateVideoMetadata(payload: any) {
    const headers = new HttpHeaders({
      'x-api-key': 'cr0SFV85Th6UZzC07tjqh9OjSk9rC6pD6GBQGLIM'
    });

    this.spinner.requestStarted();
    this.http.post<any>(
      'https://9ptytxjeyf.execute-api.ap-south-1.amazonaws.com/Dev/Video/UpdateVideoMetadata',
      payload, 
      { headers }
    ).subscribe((response: any) => {
      this.spinner.requestEnded();
      const successMessage = this.columnState === "AddVideo" 
        ? "Video Added Successfully!" 
        : "Video Updated Successfully!";

      Swal.fire({
        title: "Done!",
        text: successMessage,
        icon: "success",
      }).then(() => {
        this.route.navigate(['/file-upload']);
        localStorage.setItem('currentPage', '');
      });
    });
  }
}