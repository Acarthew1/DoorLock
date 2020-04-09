import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "http://192.168.75.141:8000/";

  constructor(private httpClient: HttpClient) { }

  public checkFile(data){
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let postURL = 'https://www.virustotal.com/vtapi/v2/file/scan';
    return this.httpClient.post<any>(proxyurl + postURL, data);
  }

  public checkResults(data){
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let postURL = 'https://www.virustotal.com/vtapi/v2/file/report';
    return this.httpClient.post<any>(proxyurl + postURL, data);
  }

  public uploadFile(data){
    let uploadURL = `${this.SERVER_URL}/upload.php`;
    return this.httpClient.post<any>(uploadURL, data);
  
  }
}


