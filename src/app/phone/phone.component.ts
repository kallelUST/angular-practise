import { compileNgModule } from '@angular/compiler';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
})
export class PhoneComponent implements OnInit {
  @Output() selectedPhone = new EventEmitter<{
    id: String;
    name: String;
    image: String;
    price: String;
    selected: Boolean;
  }>();
  toggleIndicator: Boolean = false;
  // selectedIndicator: Boolean = false;
  @Input() phone: {
    id: String;
    name: String;
    image: String;
    price: String;
    description: String;
    status: String;
    selected: Boolean;
  } = {
    id: '',
    name: '',
    image: '',
    price: '',
    description: '',
    status: '',
    selected: false,
  };

  constructor(private router: Router) {}

  // code: acts as id
  // images[0]
  // products[i].name
  // products[i].price.formattedValue
  // products[i].stock.stockLevelStatus.code => status
  // products[i].description
  ngOnInit(): void {
    // check if it is empty or not
    // if yes, set the local data as the default
    let data = localStorage.getItem(`${this.phone.id}`);
    if (!data) {
      let localData = { toggleIndicator: false, selectedIndicator: false };
      localStorage.setItem(`${this.phone.id}`, JSON.stringify(localData));
    } else {
      console.log(JSON.parse(data));
      let dataObject: { toggleIndicator: Boolean; selectedIndicator: Boolean } =
        JSON.parse(data);
      this.toggleIndicator = dataObject.toggleIndicator;
      this.phone.selected = dataObject.selectedIndicator;
    }

    // if not empty, get the data change the propreties
    console.log('you can do it');
  }

  onClickPreview(): void {
    // change the local storage

    this.toggleIndicator = !this.toggleIndicator;
    let data = localStorage.getItem(`${this.phone.id}`);
    if (data) {
      let dataObject: { toggleIndicator: Boolean; selectedIndicator: Boolean } =
        JSON.parse(data);
      dataObject.toggleIndicator = this.toggleIndicator;
      localStorage.setItem(`${this.phone.id}`, JSON.stringify(dataObject));
    }
  }

  onClickSelected(): void {
    //change the local storage
    this.phone.selected = !this.phone.selected;
    let data = localStorage.getItem(`${this.phone.id}`);
    if (data) {
      let dataObject: { toggleIndicator: Boolean; selectedIndicator: Boolean } =
        JSON.parse(data);
      dataObject.selectedIndicator = this.phone.selected;
      localStorage.setItem(`${this.phone.id}`, JSON.stringify(dataObject));
    }

    this.selectedPhone.emit({
      id: this.phone.id,
      name: this.phone.name,
      image: this.phone.image,
      price: this.phone.price,
      selected: this.phone.selected,
    });
  }

  onClickDetails(): void {
    this.router.navigate([this.phone.id]);
  }
}
