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

  previousKeyword: string | null = '';

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

    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    this.productService
      .searchProductPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');
    this.currentCategoryId = hasCategoryId
      ? +(this.route.snapshot.paramMap.get('id') ?? 1)
      : 0;

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    if (this.currentCategoryId === 0) {
      this.productService
        .getAllProductsPaginate(this.thePageNumber - 1, this.thePageSize)
        .subscribe(this.processResult());
    } else {
      this.productService
        .getProductListPaginate(
          this.thePageNumber - 1,
          this.thePageSize,
          this.currentCategoryId
        )
        .subscribe(this.processResult());
    }
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
