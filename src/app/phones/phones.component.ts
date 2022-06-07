import { Component, OnInit } from '@angular/core';
import dataJSON from '../../assets/data.json';

interface Phone {
  id: String;
  name: String;
  image: String;
  price: String;
  description: String;
  status: String;
  selected: Boolean;
}
interface SelectedPhone {
  id: String;
  name: String;
  image: String;
  price: String;
  selected: Boolean;
}

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
})
export class PhonesComponent implements OnInit {
  p: number = 1;
  phoneArr: Phone[] = [];
  selectedArr: SelectedPhone[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log(dataJSON.products);
    this.phoneArr = dataJSON.products.map((phone) => {
      let yourName: String = '';
      if (!phone.name) {
        yourName = phone.summary
          .replace(/<[^>]*>/g, '')
          .replace(/[^\x00-\x7F]/g, '')
          .trim();
      } else yourName = phone.name;
      let phoneObj = {
        id: phone.code,
        name: yourName,
        image: phone.variantOptions[0].mainImage.url,
        price: phone.priceList[0].formattedValue,
        description: phone.description,
        status: phone.stock.stockLevelStatus.code,
        selected: false,
      };

      return phoneObj;
    });

    this.phoneArr.forEach((phone) => {
      let stringData = localStorage.getItem(`${phone.id}`);
      if (stringData) {
        let JSONData = JSON.parse(stringData);
        if (JSONData.selectedIndicator) {
          this.selectedArr.push({
            id: phone.id,
            name: phone.name,
            image: phone.image,
            price: phone.price,
            selected: true,
          });
        }
      }
    });
    console.log(this.selectedArr);

    console.log(this.phoneArr);
  }

  addNewSelectedPhone(newSelectedPhone: {
    id: String;
    name: String;
    image: String;
    price: String;
    selected: Boolean;
  }) {
    if (newSelectedPhone.selected) this.selectedArr.push(newSelectedPhone);
    else {
      this.selectedArr = this.selectedArr.filter(
        (phone) => phone.id != newSelectedPhone.id
      );
    }
  }

  deleteAllSelectedItems() {
    this.selectedArr.forEach((selected) => {
      let stringData = localStorage.getItem(`${selected.id}`);
      if (stringData) {
        let DataObject = JSON.parse(stringData);
        DataObject.selectedIndicator = false;
        localStorage.setItem(`${selected.id}`, JSON.stringify(DataObject));
      }
      this.phoneArr.forEach((phone) => {
        if (phone.id === selected.id) {
          phone.selected = false;
        }
      });
    });

    this.selectedArr = [];
  }
}
