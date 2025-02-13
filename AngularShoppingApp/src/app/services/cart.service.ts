import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {}

  addToCart(theCartItem: CartItem) {
    let foundCartItem = this.cartItems.find(
      (item) => item.id === theCartItem.id
    );

    if (foundCartItem) {
      foundCartItem.quantity += theCartItem.quantity;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalQuantityValue = 0;
    let totalPriceValue = 0;

    this.cartItems.forEach((item) => {
      totalQuantityValue += item.quantity;
      totalPriceValue += item.quantity * item.unitPrice;
    });

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
