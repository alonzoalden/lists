export class List {
  constructor(
      public ListID: number,
      public Title: string,
      public Category: string,
      public Description: number,
      public ImageURL: number,
      public Created: Date,
      public Updated: Date,
      public Items: Array<ListItem>,
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
