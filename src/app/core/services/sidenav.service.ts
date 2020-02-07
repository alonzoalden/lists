import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor() {}
  public sideNav: Subject<any> = new BehaviorSubject<any>(null);
  registerSideNav(element: MatSidenav) {
    this.sideNav.next(element);
  }
}
