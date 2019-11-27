import { List } from './../core/models/list.component';
import { ListService } from './../core/services/list.service';
import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
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
  constructor(
    private imageService: ImageService,
    private listService: ListService
  ) { }

  ngOnInit() {
    this.list = new List(null, null, null, null, null, null, null, []);
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
