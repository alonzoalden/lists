import { Component, OnInit } from '@angular/core';
import { ListItem, List, Category } from '../core/models/list.component';
import { ListService } from '../core/services/list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-item-add',
  templateUrl: './list-item-add.component.html',
  styleUrls: ['./list-item-add.component.css']
})
export class ListItemAddComponent implements OnInit {
  list: List;
  listItem: ListItem;
  listID: number;
  categories: Category[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.list = new List(null, null, null, null, null, null, null, null, []);
    this.listItem = this.addNewItem();
    this.route.paramMap.subscribe((param: any) => {
      this.listID = Number(param.params.id);

      this.listService.currentListings.subscribe(data => {
        this.categories = this.listService.findAllCategories();
        if (this.listID) {
          const foundCategory = data.find(
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
        }
      });
    });
  }
  addNewItem() {
    return new ListItem(this.list.ListID, null, null, null, null, null, null);
  }
}
