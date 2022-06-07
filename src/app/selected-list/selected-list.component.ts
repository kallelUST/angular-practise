import { Component, OnInit, Input } from '@angular/core';

interface SelectedPhone {
  id: String;
  name: String;
  image: String;
  price: String;
}

@Component({
  selector: 'app-selected-list',
  templateUrl: './selected-list.component.html',
})
export class SelectedListComponent implements OnInit {
  @Input() phoneArr: SelectedPhone[] = [];
  constructor() {}

  ngOnInit(): void {}
}
