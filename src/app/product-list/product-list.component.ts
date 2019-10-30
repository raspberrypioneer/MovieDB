import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
//import { products } from '../products'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;

  constructor(
    private productService: ProductService
  ) { }

  share() {
    window.alert('The product has been shared!');
  }
  
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  ngOnInit() {
    //this.products = this.productService.getProductsTest();
    //this.products = this.productService.getProductsTest2();
    //this.products = [{ name: 'Phone XL', price: 799, description: 'A large phone with one of the best screens' }];
    this.products = this.productService.getProducts();
    //this.products = products;
  }
}