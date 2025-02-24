import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  private countriesUrl = 'http://localhost:8081/api/countries';
  private statesUrl = 'http://localhost:8081/api/states';
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient
      .get<GetResponseStates>(searchStateUrl)
      .pipe(map((response) => response._embedded.states));
  }

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

export interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}
export interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
