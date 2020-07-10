/**
 * The properties of an Episode from the Rick and Morty API.
 */
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
/**
 * The response from the Rick and Morty characters API.
 * 'info' property properties related to Characters database (count, pages, the next and prev page urls).
 * 'results' property with an array of Characters.
 */
export interface CharactersAPIResponse {
  info: ApiInfo;
  results: Character[];
}
/**
 * The info field on the Characters API response.
 */
export interface ApiInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
/**
 * The properties of a Character from the Rick and Morty API
 */
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
/**
 * Properties of an Origin, found on a Character from the Rick and Morty API.
 */
interface Origin {
  name: string;
  url: string;
}
/**
 * Properties of a Location from the Rick and Morty API.
 */
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
/**
 * Possible responses from the Rick and Morty API.
 */
export type RnmApiResponse = CharactersAPIResponse | Episode | Location | Character;
