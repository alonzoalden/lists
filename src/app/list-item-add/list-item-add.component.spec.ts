import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemAddComponent } from './list-item-add.component';

describe('ListItemAddComponent', () => {
  let component: ListItemAddComponent;
  let fixture: ComponentFixture<ListItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListItemAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
