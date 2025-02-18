import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
  listCartDetails() {
    this.cartItems = this.cartServ.cartItems;
    this.subscriptions.push(
      this.cartServ.totalPrice.subscribe((data) => {
        this.totalPrice = data;
      })
    );

    this.subscriptions.push(
      this.cartServ.totalQuantity.subscribe((data) => {
        this.totalQuantity = data;
      })
    );
    this.cartServ.computeCartTotals();
  }

  incrementQuantity(tempCartItem: CartItem) {
    this.cartServ.addToCart(tempCartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartServ.decrementQuantity(cartItem);
  }
}
