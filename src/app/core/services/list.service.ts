import { List, Category, ListItem } from './../models/list.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  private currentListingsSubject = new BehaviorSubject<Category[]>([]);
  public currentListings = this.currentListingsSubject.asObservable().pipe(distinctUntilChanged());
  constructor(private http: ApiService) { }

  public getListings(): Subscription {
    return this.http.get('/api/lists')
      .subscribe((data: Category[]) => this.currentListingsSubject.next(data));
  }

  public addListing(list: any): Observable<List> {
    return this.http.post('/api/lists', list)
      .pipe(map(data => data));
  }

  public getListItems(id: number): Observable<ListItem[]> {
    return this.http.get('/api/list/' + id)
      .pipe(map(data => data));
  }



}
