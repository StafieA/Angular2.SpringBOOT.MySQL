import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  currentCategoryId: number = 1;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(() => this.listProducts());
  }

  listProducts() {
    this.currentCategoryId = +(this.route.snapshot.paramMap.get('id') ?? 1);

    this.productService.getProductList(this.currentCategoryId).subscribe(
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
