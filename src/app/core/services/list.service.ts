import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: ApiService) { }

  public getListings(): Observable<any> {
    return this.http.get('/api/lists')
      .pipe(map(data => data));
  }
}
