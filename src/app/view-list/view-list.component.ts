import { Component, OnInit } from '@angular/core';
import { ListService } from '../core/services/list.service';
import { ImageService } from '../core/services/image.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.listService.currentListings.subscribe(data => {
      const newData = [...data];
      const index = newData.findIndex(items => items.Title === 'None');
      newData.splice(index, 1);
    });
  }
}
