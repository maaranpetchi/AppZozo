import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoDetailsServiceService {

  public videoDetails: any;

  setVideoDetails(details: any): void {
    this.videoDetails = details;
  }

  getVideoDetails(): any {
    return this.videoDetails;
  }}
