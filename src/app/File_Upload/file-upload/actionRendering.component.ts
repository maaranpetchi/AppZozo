import { Component, Injector, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { VideoDetailsServiceService } from 'src/app/services/video-details-service.service';
import { SpinnerService } from 'src/app/Spinner/spinner.service';
@Component({
    selector: 'app-vendorrenderer',
    template: `
    <span class="total-value-renderer">
      <i class="fa fa-edit" matTooltip="edit" style="cursor: pointer;color:green" (click)=" EditButton(params)"></i>
    </span>
  `,
    styles: [``]
})
export class ActionrenderingComponent implements ICellRendererAngularComp {
    gettingData: any;
    componentParent: any;
    params: ICellRendererParams<any, any, any> | undefined;
    Context: any;
    AdvanceAdjustmentContext: any;
    AdvanceAdjustmentSelectedDepartment: any;
    constructor(private injector: Injector, private http: HttpClient, private router: Router, private dialog: MatDialog, private videoDetails: VideoDetailsServiceService, private spinner: SpinnerService
    ) { }
    refresh(params: ICellRendererParams<any, any, any>): boolean {
        throw new Error('Method not implemented.');
    }
    iconClicked: boolean = false;
    // gets called once before the renderer is used
    agInit(params: ICellRendererParams): void {
        this.gettingData = params.data;
        this.params = params;
        console.log(this.params, "params: ");
        console.log(this.gettingData, "gettingData: ");

        this.dialog = this.injector.get(MatDialog);
    }

    EditButton(param: any) {
        console.log(this.params, "params: ");
        console.log(this.gettingData, "gettingData: ");
        localStorage.setItem('currentPage', "UpdatePage");

        // Define headers with the x-api-key
        const headers = new HttpHeaders({
            'x-api-key': 'cr0SFV85Th6UZzC07tjqh9OjSk9rC6pD6GBQGLIM'
        });

        // Make the GET request with the headers
        this.spinner.requestStarted();
        this.http.get<any>(
            `https://9ptytxjeyf.execute-api.ap-south-1.amazonaws.com/Dev/Video/GetVideoDetailsById?VideoID=${this.gettingData.VideoID}`,
            { headers } // Pass headers as options
        ).subscribe(
            response => {
                this.spinner.requestEnded();
                // Check if response has the expected structure
                if (response && response.body && response.body.data) {
                    this.videoDetails.setVideoDetails(response.body.data); // Pass only the data
                } else {
                    console.warn('Unexpected response structure:', response);
                    // Handle unexpected response structure
                    this.videoDetails.setVideoDetails({});
                }

                this.router.navigate(['/VideoMetaData']);
            },
            error => {
                console.error('Error fetching video details:', error);
            }
        );
    }



}