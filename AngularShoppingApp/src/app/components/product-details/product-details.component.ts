import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  addToCart() {
    this.cartServ.addToCart(new CartItem(this.product));
  }
  handleProductDetails() {
    const productId: number = +(this.route.snapshot.paramMap.get('id') ?? 1);

    this.productsService.getProduct(productId).subscribe((response) => {
      this.product = response;
    });
  }
}
