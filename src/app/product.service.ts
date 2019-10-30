import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {}

  getProducts() {
    return this.http.get('/assets/products.json');
  }

  getProductsTest() {
    return [{ name: 'Phone XL', price: 799, description: 'A green phone with one of the best screens' }];
  }

  getProductsTest2() {
    return [{ "name": 'Phone XL', "price": 799, "description": 'A blue phone with one of the best screens' }];
  }

}