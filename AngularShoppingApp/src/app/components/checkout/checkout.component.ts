import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { Country } from '../../common/country';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceForm: FormServiceService
  ) {}
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
    const startMonth = new Date().getMonth() + 1;
    console.log('startMonth = ' + startMonth);
    this.serviceForm.getCrediCartMontths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });

    this.serviceForm.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    this.serviceForm.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onSubmit() {
    console.log('Values from submit');
    console.log(this.checkoutFormGroup?.get('customer')?.value);
  }

  copyShipAddressToBillAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup
        .get('billingAddress')
        ?.setValue(this.checkoutFormGroup.get('shippingAddress')?.value);
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.serviceForm.getCrediCartMontths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });
  }
}
