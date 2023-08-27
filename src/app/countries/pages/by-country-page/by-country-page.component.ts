import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public textInput: string = 'Buscar por país';
  public initialValue: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCountries.busqueda;
    this.countries = this.countriesService.cacheStore.byCountries.countries;
  }

  searchByCountry(busqueda: string): void {
    this.isLoading = true
    this.countriesService.searchCountry(busqueda)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
