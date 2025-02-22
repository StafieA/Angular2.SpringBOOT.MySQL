import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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
  shippAddressStates: State[] = [];
  billAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceForm: FormServiceService
  ) {}
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
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
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  copyShipAddressToBillAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup
        .get('billingAddress')
        ?.setValue(this.checkoutFormGroup.get('shippingAddress')?.value);
      this.billAddressStates = this.shippAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billAddressStates = [];
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
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    this.serviceForm.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippAddressStates = data;
      } else {
        this.billAddressStates = data;
      }
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
