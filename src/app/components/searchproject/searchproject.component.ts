import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchproject',
  templateUrl: './searchproject.component.html',
  styles: [],
})
export class SearchprojectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  //Create a property
  enteredSerchValue: string = '';

  @Output()

  //Create custom event
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  //Erase custom event
  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSerchValue);
  }
}
