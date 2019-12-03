import { List, Category } from './core/models/list.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ListService } from './core/services/list.service';
// import { DomSanitizer } from '@angular/platform-browser';
// import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'lists';
  lists: List[];
  categories: Category[];
  uncategorized: List[];
  panelOpenState: boolean;
  mobileQuery: MediaQueryList;
  @ViewChild('snav', {static: true}) snav: MatSidenav;

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  constructor(
    private listService: ListService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  ngOnInit() {
    this.listService.getListings().subscribe(data => {
      const uncategorized = data.find((item) => item.Title === null);
      if (uncategorized) {
        this.uncategorized = uncategorized.Lists;
      }
      this.categories = data;
    });
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
