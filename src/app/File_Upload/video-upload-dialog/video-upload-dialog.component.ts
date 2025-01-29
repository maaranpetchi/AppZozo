import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VideoDetailsServiceService } from 'src/app/services/video-details-service.service';

@Component({
  selector: 'app-video-upload-dialog',
  templateUrl: './video-upload-dialog.component.html',
  styleUrls: ['./video-upload-dialog.component.scss']
})
export class VideoUploadDialogComponent implements OnInit {

  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // selectedFile: File | null = null;





  // ngOnInit(): void {
  //   const elements = document.querySelectorAll('[aria-hidden]'); elements.forEach(element => { element.removeAttribute('aria-hidden'); });  }


  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //     console.log(this.selectedFile,"selected file")
  //   }
  // }
  // deleteFile() {
  //   if (this.selectedFile) {
  //     this.selectedFile = null;
  //     // Reset the file input to allow selecting the same file again
  //     this.fileInput.nativeElement.value = '';
  //   }
  // }
  // uploadFile() {
  //   if (this.selectedFile) {
  //     console.log('File uploaded:', this.selectedFile.name);
  //     // Add your upload logic here
  //   }
  // }

  file: File | null = null; // To store the selected private key file
  iframeSrc: string | null = null; // To store the iframe source
  keyValue: string = '600b4990-e5d3-4b7d-b86e-0fa1f0edfb86'; // The key-value to send


  privateKey = `-----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9CaTCnzPTaTYF
  rP7xDyEQzUjqdW2PPfzyS8cZwmNo2B64Sn24nt5kynDJ1hBDL8aEwo+hHeg28Erj
  W3P/G0qEzMr5uHzdAQ4sfhNMSJQ60vktfxlVT4FVIt3bDnYybcKsQpWEAVq9D8UG
  IkP8CTYjVcV7mURLMEyXkx1+67CvmPQQg63M1B/4fLxqira40OjhSc7pwWlZCUS/
  WP2vlT9hITJVPtHXnyvV6Jlj36I70u1X7ZaYj2k1I4WrA03aPK6XE1meXUCxMzQb
  0ATX7Dz9v+3by2ByZyFBNII5sEEJzjIEOoCHF/TpGY7Q45YVr9I/g0YUsfnkARjJ
  u+XjNZ8FAgMBAAECggEAB+kb5nMQEaRA+PrUzlSiPxhAGWOhmpFvANqv8cGDNHN6
  0Z54ZV3sk44vKxsUoiMhLRQRO55LReVHVP1SPNYxB56kTc/tFbiCFdWOzC3rWgzT
  FZbQghPqJxxm6VBRHOof7+J3bEc8O1YqGggcDTN7ev4PXg07YOQcCGnFHbcSNT7g
  UOrpHs9pZAHJyViVzyk2Jn1QnzkvnMEGvmLJaaehCWc4rgVCdIE2IsGJ4rApD84t
  NZf7V5z+s1tXN7OlHi8iiQPhWOeIfkwe+DM9b3uOQr8eX/+ToElOZsaKy8Itiue6
  xTq0OhODqJfxHX6WloIw3jv2Fpn0gN4Q5DGw3T4FMQKBgQDGRQ0UXOATrX5vVeii
  7Ytq7yQU8Fb50yXU8MmJqwAR5XUZMeoDFjevOnvkxsNS0SA6uY9u6YpchWN7UHMe
  zZXLayhLbKC/AclQbsUR/ftjYLMcifFTvG8mHwQxHzAAibVZ6i+/upOELntVLoWz
  Gumdv8e0dc4elGF5XM+mfUw+XQKBgQD0FHAzn5pq5/vYwnRS02/vY3jXGDDnSnYJ
  OncD9kwGCqdIfP7Kw30tLFPE4Z80NbPFE2e6mcCNJM0x+ZcPv3pvOPKhF+//BHDR
  lWgkNdccU8j9pd4BVeA1AAeQmNi3In4nfvNrvCjMwe+yPhg+Qy8u/6HGfrp+rqSL
  wIGMXiDIyQKBgFpmN212XzB5pTEsMVLADhYmjQQDBRUJIbGyS6G6VuDSBw8CxBi+
  M4twlfacbYhAE3rTCkPetZgztUUPTD3aLJc/93JUSAJu1RQYPUBT1h/cgi3b8y1j
  uCXgdG/VMXS9VPN3JGg9sG7PJqqS+KDN/4BOZcaxA9bLfpnwKDlX3cB9AoGBAL37
  +qn0HXoBQGMkWO7vbT1kq/ag+c/OgboFLAaFe/9n43Xk9V5Wc+Tpj/q7s/QrqNZJ
  mIAClYJHlwDDSfYUEPTp2tHRlBloF3jLVth4oAuIm/XzWa6obXBTqY+/qVBDJPcR
  NeAyAX//pNeUxcIRAXUPvZiHpBpfTe0J1syvp80hAoGBAKhTZ/fWXQm4EuAwentG
  Cde3HcEHBSp2Q96qt9wnxNquzzhBMww+mJGiFDX5SY+VLe0Xmn+4D7rBJhDgh3+t
  oGSLKSleYPUqFN4mDjqFZcu3zpbHBHJU2XyKnVZsrzxGuGm4qGN6Mr+PmQSMnE5+
  wBEDvtZIBRmCvOXzwipA98tN
  -----END PRIVATE KEY-----`;


  keyPairId='K24M5UV9E078U5';
  constructor(private http: HttpClient,public preSignedUrlService:VideoDetailsServiceService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Handle file selection
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  response: any;
  // Upload the file and key-value
  uploadKey(): void {
    // const preSignedUrl = 'https://d35wls4zhylql7.cloudfront.net/WebSeries/best-of-tcf/S01/DASH%20ISO/WS_BestofTCF_S01_E04.mpd';

    // this.preSignedUrlService.sendToPreSignedUrl(preSignedUrl).subscribe({
    //   next: (response:any) => console.log('Response:', response),
    //   error: (error:any) => console.error('Error:', error),
    // });
  }

}
