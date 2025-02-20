import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';
  constructor(private httpClient: HttpClient) {}

  getCrediCartMontths(startMonth: number): Observable<number[]> {
    // let data: number[] = [];

    // for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
    //   data.push(theMonth);
    // }

    // return of(data);

    return of(
      Array.from({ length: 13 - startMonth }, (_, i) => startMonth + i)
    );
  }

  getCreditCardYears(): Observable<number[]> {
    // let data: number[] = [];
    const startYear: number = new Date().getFullYear();

    return of(Array.from({ length: 10 }, (_, i) => startYear + i));
  }
}
