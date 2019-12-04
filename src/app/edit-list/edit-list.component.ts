import { List, Category, ListItem } from './../core/models/list.component';
import { ListService } from './../core/services/list.service';
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../core/services/image.service';
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  isTest: boolean;
  selectedFile: any;
  list: List;
  categories: Category[];
  listItems: ListItem[] = [];
  listItem: ListItem;
  editMode: boolean;
  currentIndex: number;

  constructor(
    private imageService: ImageService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.list = new List(null, null, null, null, null, null, null, null, []);
    this.listItem = this.addNewItem();
    this.listService.currentListings.subscribe(data => {
      const newData = [...data];
      const index = newData.findIndex(items => items.Title === 'None');
      newData.splice(index, 1);
      this.categories = newData;
    });
  }
  addNewLine() {
    this.listItems.push(this.listItem);
    this.listItem = this.addNewItem();
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        },
        (err) => {
        });
    });

    reader.readAsDataURL(file);
  }
  addNewList() {
    if (this.list.CategoryID) {
      this.list.CategoryTitle = this.categories.find(category => category.CategoryID === this.list.CategoryID).Title;
    }
    if (!this.list.CategoryTitle) {
      this.list.CategoryTitle = 'None';
    }
    this.listService.addListing(this.list).subscribe();
  }
  onRemoveListItem(i) {
    const confirmation = confirm('Are you sure you want to remove this item?');
    if (confirmation) {
      this.listItems.splice(i, 1);
    }
  }
  onClickListItem(item, i) {
    const obj = {};
    const copy = Object.assign(obj, item);
    this.currentIndex = i;
    this.listItem = copy;
    this.editMode = true;
  }
  onSaveItemEdit() {
    this.listItems[this.currentIndex] = this.listItem;
    this.clearEditMode();
  }
  clearEditMode() {
    this.currentIndex = null;
    this.editMode = false;
    this.listItem = this.addNewItem();
  }
  addNewItem() {
    return new ListItem(this.list.ListID, null, null, null, null, null, null);
  }
}
