import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  public textInput: string = 'Buscar por capital';
  public initialValue: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCapital.busqueda;
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }

  searchByCapital(busqueda: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(busqueda)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
