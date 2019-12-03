export class Category {
  constructor(
      public CategoryID: number,
      public Title: string,
      public Description: number,
      public ImageURL: number,
      public Created: Date,
      public Updated: Date,
      public Lists: Array<List>
  ) {}
}
export class List {
  constructor(
      public ListID: number,
      public CategoryID: string,
      public Title: string,
      public CategoryTitle: string,
      public Description: number,
      public ImageURL: number,
      public Created: Date,
      public Updated: Date,
      public Items: Array<ListItem>
  ) {}
}
export class ListItem {
  constructor(
      public ListID: number,
      public ListItemID: number,
      public Title: string,
      public Description: number,
      public ImageURL: number,
      public Created: Date,
      public Updated: Date,
  ) {}
}
