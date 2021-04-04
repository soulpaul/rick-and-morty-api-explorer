export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: IEpisode[];
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: ICharacter[];
}

export interface IInfo {
  count: number;
  pages: number;
  prev: number;
  next: number;
}
