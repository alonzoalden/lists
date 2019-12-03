import { List, Category } from './../core/models/list.component';
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
  constructor(
    private imageService: ImageService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.list = new List(null, null, null, null, null, null, null, null, []);
    this.listService.getListings().subscribe(data => {
      const index = data.findIndex(items => items.Title === 'None');
      data.splice(index, 1);
      this.categories = data;
    });
  }
  addNewLine() {
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
    this.listService.addListing(this.list).subscribe();
  }
}
