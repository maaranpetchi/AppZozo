import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VideoUploadDialogComponent } from '../video-upload-dialog/video-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridApi, ColDef, GridReadyEvent, CheckboxSelectionCallbackParams, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionrenderingComponent } from './actionRendering.component';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/Spinner/spinner.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;

  constructor(private dialog: MatDialog, private http: HttpClient,private route:Router,private spinner:SpinnerService) { }

  dialogRef: MatDialogRef<VideoUploadDialogComponent> | null = null;


  openUploadDialog(): void {
    this.route.navigate(['/VideoMetaData']);
    localStorage.setItem('currentPage','AddVideo');
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
  /////////////////////////Ag-grid module///////////////////////////////
  @ViewChild('agGrid') agGrid: any;
  private gridApi!: GridApi<any>;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  context: any = "inventory-form";
  columnDefs: ColDef[] = [
    {
      headerName: 'Title', field: 'originalTitle', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Duration(HH:MM)', field: 'duration', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Upload Date',
      field: 'UploadTimestamp',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellRenderer: (params: any) => {
        if (params.value) {
          const date = new Date(params.value);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
        return '';
      },
      cellStyle: { fontWeight: 'bold' },

    }
    ,
    {
      headerName: 'Category', field: 'category', filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Status',
      field: 'TranscodeStatus',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellStyle: (params: any) => {
        if (params.value === 'COMPLETE') {
          return { color: 'green' };
        } else if (params.value === 'pending') {
          return { color: 'red' };
        }
        return null; // Default styling if no match
      },
    },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: ActionrenderingComponent, // JS comp by Direct Reference
      autoHeight: true,
    }
    ,
  ];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData: any[] = [];
  public themeClass: string =
    "ag-theme-quartz";
  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.spinner.requestStarted();
    const headers = new HttpHeaders({
      'x-api-key': 'cr0SFV85Th6UZzC07tjqh9OjSk9rC6pD6GBQGLIM'
    });
    
    this.http.get<any>('https://9ptytxjeyf.execute-api.ap-south-1.amazonaws.com/Dev/Video/GetAllVideoDetails', { headers } ).subscribe((response) => {
      this.rowData = response.body.data.items;
      this.spinner.requestEnded();

    })
  }
  handleCellValueChanged(params: { colDef: ColDef, newValue: any, data: any }) {

    let parameterData = params.data
    if (params.colDef.field === 'filecount') { // Check if the changed column is 'price'
    }
  }

}
function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.api.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

