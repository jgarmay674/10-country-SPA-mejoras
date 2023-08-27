import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: BusquedaCountries;
  byCountries: BusquedaCountries;
  byRegion: RegionCountries;
}

export interface BusquedaCountries {
  busqueda: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[];
}
