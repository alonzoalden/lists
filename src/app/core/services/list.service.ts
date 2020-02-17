import { List, Category, ListItem } from './../models/list.component';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  private currentListingsSubject = new BehaviorSubject<Category[]>([]);
  public currentListings = this.currentListingsSubject.asObservable();
  constructor(private router: Router, private http: ApiService) {}

  public getListings(): Subscription {
    return this.http
      .get('/api/lists')
      .subscribe((data: Category[]) => this.currentListingsSubject.next(data));
  }

  public addListing(list: List): Observable<List> {
    return this.http.post('/api/lists', list).pipe(map(data => data));
  }
  public updateListing(list: List): Observable<List> {
    return this.http
      .put('/api/lists/' + list.ListID, list)
      .pipe(map(data => data));
  }

  public deleteListing(id: number): Observable<List> {
    return this.http.delete('/api/list/' + id).pipe(map(data => data));
  }

  public getListItems(id: number): Observable<ListItem[]> {
    return this.http.get('/api/list/' + id).pipe(map(data => data));
  }
  public updateSelectedSubject(categories: Category[]): void {
    this.currentListingsSubject.next(categories);
  }

  public findAllCategories(): any {
    this.currentListings.subscribe(data => {
      const newData = [...data];
      const index = newData.findIndex(items => items.Title === 'None');
      if (index > -1) {
        newData.splice(index, 1);
      }
      return newData;
    });
  }
  public findList(listid: number): any {
    this.currentListings.subscribe(data => {
      if (listid) {
        const foundCategory = data.find(
          category =>
            category.Lists &&
            category.Lists.find(list => list.ListID === listid)
        );
        const foundList =
          foundCategory &&
          foundCategory.Lists.find((list: List) => list.ListID === listid);
        if (!foundList) {
          return this.router.navigate(['']);
        }
        if (foundList && !foundList.Items) {
          this.getListItems(foundList.ListID).subscribe(items => {
            foundList.Items = items;
          });
        }
        return foundList;
      }
    });
  }
}
