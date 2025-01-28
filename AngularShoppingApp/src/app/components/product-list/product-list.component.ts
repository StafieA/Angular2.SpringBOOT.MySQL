import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    console.log('data coming ' + this.productList);
    this.listProducts();
    console.log('data coming ' + this.productList);
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      (data) => {
        this.productList = data;
        console.log(
          'Data received: ' + JSON.stringify(this.productList[0].imageUrl)
        );
      },
      (error) => {
        console.error('Error fetching product list:', error);
      }
    );
  }
}
