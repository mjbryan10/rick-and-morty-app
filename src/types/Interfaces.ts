export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharactersAPI {
  info: ApiInfo;
  results: Character[];
}
export interface ApiInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
interface Origin {
  name: string;
  url: string;
}
