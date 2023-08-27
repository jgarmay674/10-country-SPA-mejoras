import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

    ngOnInit(): void {
    this.activatedRoute.params
/*       .subscribe( (params) => {
        console.log({params: params['id']}); */
      .subscribe( ({id}) => { // desestructuración
        this.searchByCountryAlphaCode(id);
      });
  }

  searchByCountryAlphaCode(busqueda: string): void {
    this.countriesService.searchCountryAlphaCode(busqueda)
      .subscribe(country => {
        if (!country) {
          return this.router.navigateByUrl('');
        } else {
          return this.country = country;
          return;
        }
      });
  }
}
