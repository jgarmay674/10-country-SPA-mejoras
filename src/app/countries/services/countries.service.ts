import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {busqueda: '', countries: []},
    byCountries: {busqueda: '', countries: []},
    byRegion: {region: '', countries: []}
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheStore')) {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
  }

  searchCountryAlphaCode( busqueda: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${busqueda}`;
    return this.httpClient.get<Country[]>( url )
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([])),
        delay(1000)
      );
  }

  searchCapital( busqueda: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${busqueda}`;
    return this.getCountriesRequest(url)
      .pipe (
        tap( countries => this.cacheStore.byCapital = {busqueda: busqueda, countries: countries}), // desde ES6, = {busqueda, countries}
        tap( () => this.saveToLocalStorage())
      );
  }

  searchCountry( busqueda: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${busqueda}`;
    return this.getCountriesRequest(url)
      .pipe (
        tap( countries => this.cacheStore.byCountries = {busqueda, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe (
        tap( countries => this.cacheStore.byRegion = {region, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }

}
