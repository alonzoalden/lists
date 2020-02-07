import { Component, OnInit } from '@angular/core';
import { ListService } from '../core/services/list.service';
import { ImageService } from '../core/services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from '../core/models/list.component';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  list: List;
  listID: number;
  constructor(
    private imageService: ImageService,
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param: any) => {
      this.listID = Number(param.params.id);

      // if data gets passed in
      if (history.state.data) {
        this.list = history.state.data;
      } else {
        // if data doesn't get passed, find list item in main collection, and make api call to get associated list items
        this.listService.currentListings.subscribe(categories => {
          if (!categories.length) {
            return;
          }
          const foundCategory = categories.find(
            category =>
              category.Lists &&
              category.Lists.find(list => list.ListID === this.listID)
          );
          this.list =
            foundCategory &&
            foundCategory.Lists.find(list => list.ListID === this.listID);
          if (!this.list) {
            return this.router.navigate(['']);
          }
          if (this.list && !this.list.Items) {
            this.listService.getListItems(this.listID).subscribe(items => {
              this.list.Items = items;
            });
          }
        });
      }
    });
  }
  deleteListing(id) {
    this.listService.deleteListing(id).subscribe(() => {
      this.listService.getListings();
    });
  }
}
