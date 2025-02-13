import { Component, OnInit } from '@angular/core';
import {
  GetResponseProducts,
  ProductService,
} from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  currentCategoryId?: number;
  previousCategoryId?: number;
  searchMode?: boolean;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(() => this.listProducts());
  }

  updatePageSize(pageSize: String) {
    this.thePageSize = Number(pageSize);
    this.thePageNumber = 1;
    this.listProducts();
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProductByKeyword(theKeyword).subscribe((data) => {
      this.productList = data;
    });
  }

  handleListProducts() {
    this.currentCategoryId = +(this.route.snapshot.paramMap.get('id') ?? 1);

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());

    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   (data) => {
    //     this.productList = data;
    //     console.log(
    //       'Data received: ' + JSON.stringify(this.productList[0].imageUrl)
    //     );
    //   },
    //   (error) => {
    //     console.error('Error fetching product list:', error);
    //   }
    // );
  }

  processResult() {
    return (data: GetResponseProducts) => {
      this.productList = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
}
