import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createSign } from 'crypto-browserify';
@Injectable({
  providedIn: 'root'
})
export class VideoDetailsServiceService {
  constructor(private http: HttpClient) {}

  public videoDetails: any;

  setVideoDetails(details: any): void {
    this.videoDetails = details;
  }

  getVideoDetails(): any {
    return this.videoDetails;
  }





 // Private Key and Key Value
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
 keyValue = 'K24M5UV9E078U5';

 // Function to interact with pre-signed URL
 sendToPreSignedUrl(preSignedUrl: string) {
   // Generate a signature
   const sign = createSign('SHA256');
   sign.update(this.keyValue);
   sign.end();

   const signature = sign.sign(this.privateKey, 'base64');

   // Define headers
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: `Bearer ${signature}`,
   });

   // Make HTTP POST request
   const payload = {
     keyValue: this.keyValue,
   };

   return this.http.post(preSignedUrl, payload, { headers });
 }


}
