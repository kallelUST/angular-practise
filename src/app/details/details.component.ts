import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import dataJSON from '../../assets/data.json';

interface Phone {
  id: String;
  name: String;
  image: String;
  price: String;
  description: String;
  status: String;
 
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  
})
export class DetailsComponent implements OnInit {
  Phone: Phone = {
    id: '',
    name: '',
    image: '',
    price: '',
    description: '',
    status: '',
    
  };

  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    let phoneArr:Phone[] =  dataJSON.products.map((phone) => {
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
      };

      return phoneObj;
    });

    this.Phone = phoneArr.filter((phone)=> phone.id == this.route.snapshot.params['id'])[0]
  }

  onClickBack():void{
    this.router.navigate([''])
  }
} 
