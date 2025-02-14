import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems = this.cartServ.cartItems;
    this.cartServ.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });

    this.cartServ.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    });
    this.cartServ.computeCartTotals();
  }
}
